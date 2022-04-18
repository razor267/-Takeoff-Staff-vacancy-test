# Takeoff-Staff-vacancy-test

Проект был разработан как тестовое задание от HR-менеджера компании Takeoff Staff.

## Задание на разработку

Необходимо написать приложение личный кабинет.
В приложении должно быть две страницы:
- Страница входа
- Страница со списком контактов

Оформление и данные для заполнения страниц на усмотрение кандидата.

Обязательно наличие информации в readme о том, как запускать приложение.

Для выполнения тестового задания Вы можете использовать UI фреймворк.

Задание необходимо выполнить на TypeScript, без использования any и ts-ignore.

При выполнении работы обязательно использовать стейт менеджер (redux, mobx)

Для реализации авторизации можно использовать запросы с моковыми данными https://github.com/typicode/json-server.

Страница со списком контактов пользователя должна быть доступна только после авторизации.

На странице со списком контактов должна быть возможность добавлять/удалять/редактировать контакты, а также желательно наличие функции поиска.

## Результат

Задание было выполнено в полном объёме. Дополнительно был разработан функционал регистрации и удаления нового пользователя, адаптивность приложения под различные разрешения экранов.

Сторонние библиотеки, используемые в проекте:
  - **axios** (взаимодействие с сервером)
  - **Formik** (работа с формами)
  - **classnames** (для более удобной работы с классами)
  - **react-router-dom** (роутинг приложения)
  - **redux** (отвечает за стейтменеджемент)
  - **jsonwebtoken** (работа с токеном для авторизации)

# Deploy проекта на Heroku

<a href="http://takeoff-staff-vacancy-test.herokuapp.com/">Открыть проект</a>

# Start
```bash
npm run app
npm run server
```
**npm run app** запускает само приложение

**npm run server** запуск серверной части(для авторизации и хранения данных)

Для проверки функционала можно создать свой аккаунт, либо использовать какой либо из указанных ниже:

**Логин:** admin **Пароль:** admin

**Логин:** root **Пароль:** root

# Interface
<p align="center"><img src="https://i.ibb.co/ygtxfdt/preview-project.gif" alt="ReviewProject" border="0"></p>

<div align="right">
  <a href="https://reactjs.org/">
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  </a>
  <a href="https://redux.js.org/">
    <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  </a>
   <a href="https://www.typescriptlang.org/">    
    <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" title="TypeScript" alt="TypeScript" width="40" height="40"/>&nbsp;
  </a>
  <a href="https://www.w3.org/Style/CSS/">
    <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  </a>
  <a href="https://html.spec.whatwg.org/">    
    <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  </a>
</div>
