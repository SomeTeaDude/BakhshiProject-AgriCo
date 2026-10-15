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

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```
```bash
npm run dev
```

**NOTE:** In the project, images use the Storage facade's `url` method to generate urls for the images. The `APP_URL` variable in the `.env.example` file is already set to `http://127.0.0.1:8000` which is the default domain for laravel projects when you run them with `php artisan serve`; but if you ever used a different domain for the app, you should change the `APP_URL` variable's value to that domain as well. Otherwise, the images won't load.