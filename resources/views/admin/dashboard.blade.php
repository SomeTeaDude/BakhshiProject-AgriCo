@extends('layouts.dashboard')

@section('title', 'سفارشات')

@push('assets')
    @vite('resources/css/user/orders.css')
@endpush

@push('cdn')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
@endpush

@section('content')
    <div class="row tw:mb-10">
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$orders_count" label="کل سفارش‌ها" icon="shopping-cart" bg="success" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$users_count" label="کاربران" icon="users" bg="primary" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="$products_count" label="محصولات" icon="seedling" bg="brown" />
        </div>
        <div class="col-lg-3 col-md-6 mb-3 tw:bslg:w-max tw:bslg:min-w-1/4">
            <x-stats-card :count="number_format($price_count)" label="فروش (تومان)" icon="money-bill-wave" bg="warning" />
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="chart-container">
                <h5 class="mb-3">آمار فروش هفتگی</h5>
                <canvas id="salesChart" style="max-height: 400px"></canvas>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        document.fonts.ready.then(() => {
            const ctx = document.getElementById("salesChart").getContext("2d");

            const totals = @json($totals);

            const data = {
                labels: [
                    "شنبه",
                    "یکشنبه",
                    "دوشنبه",
                    "سه‌شنبه",
                    "چهارشنبه",
                    "پنج‌شنبه",
                    "جمعه",
                ],
                datasets: [
                    {
                        label: "فروش روزانه (تومان)",
                        data: totals,
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                        borderColor: "rgba(76, 175, 80, 1)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                    },
                ],
            };

            const config = {
                type: "line",
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value.toLocaleString("fa-IR") + " تومان";
                                },
                            },
                        },
                    },
                },
            };

            Chart.defaults.font.family = 'Vazir'
            new Chart(ctx, config);
        })
    </script>
@endpush
