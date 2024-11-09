FROM php:8.0-apache

WORKDIR /var/www/html

COPY . /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite
