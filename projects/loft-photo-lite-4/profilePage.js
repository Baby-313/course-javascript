import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {

    const userPhotoComp = document.querySelector('.component-user-info-photo');
    const userNameComp = document.querySelector('.component-user-info-name');



    userPhotoComp.style.backgroundImage=`url('${model.me.photo_100}')`

  },

  handleEvents() {
    document.addEventListener('click',(e)=>{

    })
  },
};
