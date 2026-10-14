<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Course;
use App\Models\CourseRegistration;
use App\Models\Order;
use App\Models\Payment;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Exceptions\PurchaseFailedException;
use Shetabit\Payment\Facade\Payment as BankPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shetabit\Multipay\Invoice;

class PaymentController extends Controller
{
    /**
     * @throws \Exception
     */
    public function requestCart()
    {
        if (!Auth::user()->isUser()) {
            toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->pushOnNextPage();
            return redirect()->back();
        }
        $cartItems = Auth::user()->cartItems;

        $totalPrice = $cartItems->reduce(fn ($acc, $item) => $acc + ($item->product->price * $item->quantity), 0);

        $notEnoughProduct = null;

        $items = $cartItems->map(function ($item) use (&$notEnoughProduct) {
            if ($item->product->quantity < $item->quantity) {
                $notEnoughProduct = [
                    'name' => $item->product->name,
                    'quantity' => $item->product->quantity
                ];
            }
            $item->product->quantity = $item->quantity;

            return $item->product;
        })->toArray();

        if ($notEnoughProduct) {
            toast()->danger('تعداد انتخاب شده از محصول با نام "' . $notEnoughProduct['name'] . '" بیشتر از تعداد موجود در انبار است. تعداد موجودی این محصول: ' . $notEnoughProduct['quantity'], 'خطا!')->duration(3500)->pushOnNextPage();
            return redirect()->route('dashboard.cart');
        }

        $productTypes = [];

        $cartItems->each(function ($item) use (&$productTypes) {
            $type = $item->product->type;

            if ($type === 'product' && !in_array('محصولات', $productTypes)) {
                $productTypes[0] = 'محصولات';
            }
            if ($type === 'tool' && !in_array('ادوات', $productTypes)) {
                $productTypes[1] = 'ادوات';
            }

            if (in_array('ادوات', $productTypes) && in_array('محصولات', $productTypes)) {
                return false;
            }
        });

        if ($totalPrice <= 0 || !$items || !$productTypes) {
            toast()->danger('سبد خرید شما خالی میباشد!', 'خطا!')->pushOnNextPage();
            return redirect()->route('dashboard');
        }

        $invoice = (new Invoice())->amount($totalPrice);

        $payment = null;
        $error_message = null;

        try {
            return BankPayment::callbackUrl(route('payment.verify.cart'))->purchase(
                $invoice,
                function($driver, $transactionId) use ($totalPrice, $items, $productTypes, &$payment) {
                    $whatBought = join(' و ', $productTypes);
                    $payment = Payment::create([
                        'user_id' => Auth::id(),
                        'transaction_id' => $transactionId,
                        'price' => $totalPrice,
                        'type' => 'product',
                        'status' => 'fail',
                        'items' => json_encode($items),
                        'description' => "خرید $whatBought کشاورزی از سایت مهندس بخشی"
                    ]);
                }
            )->pay()->render();
        } catch (PurchaseFailedException $e) {
            $error_message = $e->getMessage();
            toast()->danger('متاسفانه مشکلی پیش آمد، لطفا بعدا دوباره تلاش کنید. خطا: ' . $e->getMessage(), 'خطا!')->duration(5000)->pushOnNextPage();
            return redirect()->route('dashboard.cart');
        } catch (\Exception $e) {
            $error_message = "نامشخص";
            toast()->danger('هنگام پرداخت خطایی رخ داد.', 'ناموفق!')->pushOnNextPage();
            return redirect()->route('dashboard.cart');
        } finally {
            if ($payment && $error_message !== null) {
                $payment->error_message = $error_message;
                $payment->update();
            }
        }
    }

    public function verifyCart(Request $request)
    {
        $payment = null;
        $error_message = null;
        try {
            $transaction_id = $request->query('Authority');
            $payment = Payment::where('transaction_id', $transaction_id)->first();
            $receipt = BankPayment::amount($payment->price)->transactionId($transaction_id)->verify();

            $payment->reference_id = $receipt->getReferenceId();
            $payment->status = 'success';
            $payment->update();

            Order::create([
                'payment_id' => $payment->id
            ]);
            CartItem::where('user_id', Auth::id())->each(function ($item) {
                $item->product->quantity -= $item->quantity;
                $item->product->update();

                $item->delete();
            });

            toast()->success('پرداخت شما با موفقیت انجام شد. کد پیگیری: ' . $payment->reference_id, 'موفق!')->duration(4000)->pushOnNextPage();
            return redirect()->route('dashboard');
        } catch (InvalidPaymentException $exception) {
            $error_message = $exception->getMessage();
            toast()->danger($exception->getMessage(), 'ناموفق!')->duration(5000)->pushOnNextPage();
            return redirect()->route('dashboard.cart');
        } catch (\Exception $e) {
            $error_message = "نامشخص";
            toast()->danger('هنگام پرداخت خطایی رخ داد و یا اینکه توسط شما لغو شد.', 'ناموفق!')->pushOnNextPage();
            return redirect()->route('dashboard.cart');
        } finally {
            if ($payment && $error_message !== null) {
                $payment->error_message = $error_message;
                $payment->update();
            }
        }
    }

    public function requestCourse(Course $course)
    {
        if (!Auth::user()->isUser()) {
            toast()->danger('فقط کاربران معمولی اجازه ی خرید از سایت دارند.', 'خطا!')->pushOnNextPage();
            return redirect()->back();
        }

        $price = $course->price;
        $courseName = $course->name;

        $invoice = (new Invoice())->amount($price);

        $payment = null;
        $error_message = null;

        session()->put('course_id', $course->id);
        try {
            return BankPayment::callbackUrl(route('payment.verify.course'))->purchase(
                $invoice,
                function($driver, $transactionId) use (&$payment, $price, $courseName) {
                    $payment = Payment::create([
                        'user_id' => Auth::id(),
                        'transaction_id' => $transactionId,
                        'price' => $price,
                        'type' => 'course',
                        'status' => 'fail',
                        'items' => json_encode(['course_name' => $courseName]),
                        'description' => 'خرید دوره از سایت مهندس بخشی'
                    ]);
                }
            )->pay()->render();
        } catch (PurchaseFailedException $e) {
            $error_message = $e->getMessage();
            toast()->danger('متاسفانه مشکلی پیش آمد، لطفا بعدا دوباره تلاش کنید. خطا: ' . $e->getMessage(), 'خطا!')->duration(5000)->pushOnNextPage();
            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            $error_message = "نامشخص";
            toast()->danger('هنگام پرداخت خطایی رخ داد.', 'ناموفق!')->pushOnNextPage();
            return redirect()->route('dashboard');
        } finally {
            if ($error_message !== null) {
                session()->forget('course_id');
                if ($payment) {
                    $payment->error_message = $error_message;
                    $payment->update();
                }
            }
        }
    }

    public function verifyCourse(Request $request)
    {
        $payment = null;
        $error_message = null;
        try {
            $transaction_id = $request->query('Authority');
            $payment = Payment::where('transaction_id', $transaction_id)->first();
            $receipt = BankPayment::amount($payment->price)->transactionId($transaction_id)->verify();

            $payment->reference_id = $receipt->getReferenceId();
            $payment->status = 'success';
            $payment->update();

            CourseRegistration::create([
                'user_id' => Auth::id(),
                'course_id' => intval(session()->get('course_id')),
            ]);

            toast()->success('پرداخت شما با موفقیت انجام شد. کد پیگیری: ' . $payment->reference_id, 'موفق!')->duration(4000)->pushOnNextPage();
        } catch (InvalidPaymentException $exception) {
            $error_message = $exception->getMessage();
            toast()->danger($exception->getMessage(), 'ناموفق!')->duration(5000)->pushOnNextPage();
        } catch (\Exception $e) {
            $error_message = "نامشخص";
            toast()->danger('هنگام پرداخت خطایی رخ داد و یا اینکه توسط شما لغو شد.', 'ناموفق!')->pushOnNextPage();
        } finally {
            if ($payment && $error_message !== null) {
                $payment->error_message = $error_message;
                $payment->update();
            }
            session()->forget('course_id');
            return redirect()->route('dashboard');
        }
    }
}
