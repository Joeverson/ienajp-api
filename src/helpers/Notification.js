import notification from '../components/Notification'

class Notification {
  install(Vue) {
    const notfy = {
      isVisible: false,
      classes: '',
      message: 'ola carinha'
    };

    Vue.component(notification.name, notification)    

    Vue.mixin({
      data() {
        return notfy;
      }
    });

    Vue.prototype.$notification = {
      error(message) {
          notfy.isVisible = true;
          notfy.message = message;
          notfy.classes = 'notification-danger';
          this.close();
        },

        success(message) {
          notfy.isVisible = true;
          notfy.message = message;
          notfy.classes = 'notification-success';
          this.close();
        },

        alert(message) {
          notfy.isVisible = true;
          notfy.message = message;
          notfy.classes = 'notification-alert';
          this.close();
        },

        close() {
          setTimeout(() => {
            notfy.isVisible = false;
          }, 3000)
        }
    }
  }
}

export default new Notification();