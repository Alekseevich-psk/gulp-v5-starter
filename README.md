# gulp-v5-starter

## :fire: Особенности

-   Gulp v5
-   Webpack для обработки js и ts
-   Единый `config.mjs`
-   Небольшой вес node_modules (Только необходимое)
-   Автоматическая генерация
    -   Для создания компонента, элемента или секции `gulp create --component || element || section --test`
    -   Флаг на добавление файлов `.js`, `.ts`, `gulp create --component --test --ts || --js`
-   PUG опционально
    -   (По умолчанию - включен)
-   TypeScript опционально
    -   (По умолчанию - включен)
-   Импорт `.ts .js .mjs`
-   Swiper включен в сборку

## :hammer_and_wrench: Установка

-   Установите [NodeJS](https://nodejs.org/en/)
-   Установите глобально:
    -   [Gulp](https://gulpjs.com/): `npm i -g gulp gulp-cli`
-   Скачайте сборку с помощью [Git](https://git-scm.com/downloads): `git clone https://github.com/Alekseevich-psk/gulp-v5-starter.git`
-   Скачайте необходимые зависимости: `npm i`
-   Выберите режим работы HTML или PUG `npm run initPUG` или `npm run initHTML`
    -   Данные команды удалят `.html` или `.pug` файлы
    -   По умолчанию PUG - включен, файлы `.html` можно удалить вручную
    -   Если выключить Pug то, для конкатенации html файлов используется плагин `gulp-file-include`
-   Выберите режим работы TS или JS `npm run initTS` или `npm run initJS`
-   Чтобы начать работу, введите команду: `npm run start` (режим разработки)
    -   Псевдоним для быстрого запускаю dev server: `gulp`
-   Чтобы собрать проект, введите команду `npm run build` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.
Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

## 🚩 Быстрое подключение шрифтов

-   Шрифты формата .ttf закидываем по адресу `"app/fonts/ttf/"`
-   Запускаем конвертацию в формат .woff(.woff2) `npm run ttfToWoff`
-   Подключаем шрифты в mixin scss `"app/styles/fonts.scss"` командой `npm run fontsInStyle`

## ❗️ Для путей `.js`, `.ts` файлов работают псевдонимы путей

```js
    alias: {
        Components: path.resolve(__dirname, "../" + paths.components),
        Sections: path.resolve(__dirname, "../" + paths.sections),
        Elements: path.resolve(__dirname, "../" + paths.elements),
    }
```
Пример: ```import 'Components/test/test.ts';```

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

## 💣 Режимы сборки

-   `gulp switchMode --html` или `npm run switchMode --html` - HTML режим
-   `gulp switchMode --pug` или `npm run switchMode --pug` - Pug режим
-   `gulp switchMode --js` или `npm run switchMode --js` - javaScript режим
-   `gulp switchMode --ts` или `npm run switchMode --ts` - typeScript режим

## :keyboard: Команды

-   `gulp` или `npm run start` - запуск сервера для разработки проекта
-   `gulp build` или `npm run build` - собрать проект с оптимизацией без запуска сервера
-   `gulp zipDist` или `npm run zipDist` - заархивировать dist папку (Для отправки интегратору)
-   `gulp ttfToWoff` или `npm run ttfToWoff` - конвертация шрифтов из ttf2woff
-   `gulp fontsInStyle` или `npm run fontsInStyle` - подключение шрифтов в fonts.scss (Пример названия шрифта: `Montserrat-AlternatesBlack`)

## :point_right: Нюансы

-   Данную сборку использую для личных проектов, могут присутствовать наработки под быстрый старт проекта или тестовые модификации

## :yellow_heart: Нравится проект?

Сообщайте мне о [багах](https://github.com/Alekseevich-psk/gulp-v5-starter/issues)

## ⚠️ Сборка собрана на версии node.js - 20.14.0
