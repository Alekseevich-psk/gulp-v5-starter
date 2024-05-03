# gulp-v5-starter

## :fire: Особенности
* Gulp v5
* Единый config.mjs
* Небольшой вес node_modules (Только необходимое)

## :hammer_and_wrench: Установка
* Установите [NodeJS](https://nodejs.org/en/)
* Установите глобально:
    * [Gulp](https://gulpjs.com/): ```npm i -g gulp```
* Скачайте сборку с помощью [Git](https://git-scm.com/downloads): ```git clone https://github.com/Alekseevich-psk/gulp-v5-starter.git```
* Скачайте необходимые зависимости: ```npm i```
* Чтобы начать работу, введите команду: ```yarn run start``` (режим разработки)
* Чтобы собрать проект, введите команду ```yarn run build``` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## :open_file_folder: Файловая структура

```
gulp-v5-starter
├── app
│   ├── fonts
│   ├── images
│   ├── libs
│   ├── pages
│   ├── scripts
│   ├── styles
│   └── video
├── dist
├── package.json
├── ignore.d.ts
├── gulpfile.mjs
├── README.md
└── .gitignore
```

## :keyboard: Команды
* ```npm run start``` - запуск сервера для разработки проекта
* ```npm run build``` - собрать проект с оптимизацией без запуска сервера
* ```npm run zipDist``` - заархивировать dist папку (Для отправки интегратору)
* ```npm run fontsToWoff``` - конвертация шрифтов из ttf2woff (*bug)

## :point_right: Нужен SCSS без Pug?
* Переходим в config.mjs переключаем ```const onPug``` в положение ```false```

## :yellow_heart: Нравится проект?
Сообщайте мне о [багах](https://github.com/Alekseevich-psk/gulp-v5-starter/issues)