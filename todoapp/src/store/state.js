export default {
  now: new Date(),
  today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
  tomorrow: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0),
  currentIndex: 0, // 进行中的页面
  todos: [ // 执行项目
    {
      icon: 'user',
      name: 'Personal',
      tasks: [ // 项目列表
        {
          id: 1,
          title: 'Dating', // 名称
          date: new Date(), // 日期
          done: false, // 是否完成
          deleted: false // 是否删除
        }
      ],
      colors: ['#ff6262', '#ffa947'] // 页面颜色
    },
    {
      icon: 'suitcase',
      name: 'Work',
      tasks: [
        {
          id: 3,
          title: 'Design Sprint',
          date: new Date(),
          done: true,
          deleted: false
        },
        {
          id: 4,
          title: 'Icon Set Design for Mobile App',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 5,
          title: 'HTML/CSS Study',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 6,
          title: 'Weekly Report',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          id: 7,
          title: 'Design Meeting',
          date: new Date(),
          done: false,
          deleted: false
        },
        {
          title: 'Quick Prototyping',
          date: new Date('2019-09-16'),
          done: false,
          deleted: false
        },
        {
          id: 8,
          title: 'UX Conference',
          date: new Date('2019-09-16'),
          done: false,
          deleted: false
        }
      ],
      colors: ['#5b9df9', '#47bfff'] // 页面颜色
    },
    {
      icon: 'home',
      name: 'Home',
      tasks: [
        {
          id: 2,
          title: 'House Keeping',
          date: new Date(),
          done: true,
          deleted: false
        }
      ],
      colors: ['#2c7d59', '#3ba776'] // 页面颜色
    }
  ],
  selected: null,
  unselect: null,
  editing: null
}