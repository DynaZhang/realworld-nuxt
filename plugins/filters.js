import Vue from 'vue';
import dayjs from 'dayjs'

Vue.filter('formatDate', (value) => {
    return dayjs(value, 'MMM DD,YYYY');
});
