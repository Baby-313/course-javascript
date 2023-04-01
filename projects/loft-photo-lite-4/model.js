const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;
const APP_ID = 51593871;

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }

    const index = Math.round(Math.random() * (array.length - 1));

    return array[index];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url }; 
  },

  async init() {
    this.friends=await this.getFriends();
    [this.me]=await this.getUsers();
  },
  
  photoCache:{},

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      });

      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          console.error(response);
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  logout() {},

  callApi(method, params) {
    params.v = params.v || '5.131';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },
  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };
    return this.callApi('friends.get', params);
  },

  getUsers(ids) {
    const params = {
      fields: ['photo_50', 'photo_100'],
    };
    if (ids) {
      params.user_ids=ids;
    }
    return this.callApi('users.get',params)
  },

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
};
