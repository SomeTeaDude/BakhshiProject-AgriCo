# BakhshiProject - AgriCo

### To run project locally:

1. Open a terminal
1. Run `composer install`
1. Run `npm install`
1. Run `cp .env.example .env`
1. Run `php artisan key:generate`
1. Run `php artisan migrate`
1. Run `php artisan db:seed`
1. Run `php artisan serve` (everytime you want to run the project again)
1. Open a new terminal
1. Run `npm run dev` (everytime you want to run the project again)
  - Alternatively, you can run `npm run build`, and never run `npm run dev` again