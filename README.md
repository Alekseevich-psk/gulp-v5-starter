# gulp-v5-starter

## :fire: Особенности
* Gulp v5
* Webpack для обработки js и ts
* Единый ```config.mjs```
* Небольшой вес node_modules (Только необходимое)
* PUG опционально 
    * (По умолчанию включен, чтобы удалить ```.html``` выполните ```npm run onPug```)
* Импорт ```.ts .js .mjs```
* Swiper включен в сборку

## :hammer_and_wrench: Установка
* Установите [NodeJS](https://nodejs.org/en/)
* Установите глобально:
    * [Gulp](https://gulpjs.com/): ```npm i -g gulp```
* Скачайте сборку с помощью [Git](https://git-scm.com/downloads): ```git clone https://github.com/Alekseevich-psk/gulp-v5-starter.git```
* Скачайте необходимые зависимости: ```npm i```
* Выберите режим работы Pug ```npm run onPug``` или ```npm run offPug``` 
    * Данные команды удалят ```.html``` или ```.pug``` файлы
    * Если выключить Pug то, для конкатенации html файлов используется плагин ```gulp-file-include``` 
* Чтобы начать работу, введите команду: ```npm run start``` (режим разработки)
* Чтобы собрать проект, введите команду ```npm run build``` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## :open_file_folder: Файловая структура

```
gulp-v5-starter
├── app
│   ├── fonts
│   ├── images
│   ├── pages
│   ├── scripts
│   ├── styles
│   └── video
├── dist
├── package.json
├── ignore.d.ts
├── tsconfig.json
├── gulpfile.mjs
├── README.md
└── .gitignore
```

## :keyboard: Команды
* ```npm run start``` - запуск сервера для разработки проекта
* ```npm run build``` - собрать проект с оптимизацией без запуска сервера
* ```npm run zipDist``` - заархивировать dist папку (Для отправки интегратору)
* ```npm run ttfToWoff``` - конвертация шрифтов из ttf2woff
* ```npm run fontsInStyle``` - подключение шрифтов в fonts.scss (Пример название шрифта: ```Montserrat-AlternatesBlack```)

## :point_right: Нюансы
* Данную сборку использую для личных проектов, могут присутствовать наработки под быстрый старт проекта или тестовые модификации

## :yellow_heart: Нравится проект?
Сообщайте мне о [багах](https://github.com/Alekseevich-psk/gulp-v5-starter/issues)