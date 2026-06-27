<script>
import api from './api-entry';

export default {
  onLaunch: function() {
    console.log('App Launch')
    const params = {
      page: 1,
      perPage: 10,
      filter: {
        sticky: 0,
        essence: 1,
        // sort: 2,
        // attention: 1,
        // categoryids: [1, 2, 3],
      },
    };

    api.readThreadList({ params })
      .then(result => console.log('read', result));
    api.readThreadDetail({ params: { pid: 40 } })
      .then(result => console.log('detail', result));

    api.readCategories().then(result => console.log('categories', result));

    api.readCommentList().then(result => console.log('commentlist', result))

    api.readStickList().then(result => console.log('sticklist', result));
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
	/*每个页面公共css */
</style>
