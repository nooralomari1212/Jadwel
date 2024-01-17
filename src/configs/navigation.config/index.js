import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant';

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['student', 'chairman' , 'registerer'],
        subMenu: [],
    },
    

    /** Example purpose only, please remove */
   
    //Student
    {
        key: 'Sceduales',
        path: '',
        title: 'Sceduales',
        translateKey: 'nav.Sceduales.Sceduales',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['student'],
        subMenu: [
            {
                key: 'ViewSchedule',
                path: '/ViewSchedule',
                title: 'View Suggested Sceduales',
                translateKey: 'nav.View',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'Suggest Course',
        path: '/suggested-course',
        title: 'Suggest Course',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['student'],
        subMenu: [],
    },
    //Chairman
    {
        key: 'ChairmanMenu',
        path: '',
        title: 'Chairman Menu',
        translateKey: 'nav.ChairmanMenu.ChairmanMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['chairman'],
        subMenu: [
            // {
            //     key: 'Genrate Schedule',
            //     path: '/GenrateSchedule',
            //     title: 'Operations',
            //     translateKey: 'GenrateSchedule',
            //     icon: 'groupCollapseMenu',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [],
            //     subMenu: [],
            // },
            // {
            //     key: 'CompareSchedule',
            //     path: '/compare-schedule',
            //     title: 'Studnets',
            //     icon: 'groupSingleMenu',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [],
            //     subMenu: [],
            // },
            {
                key: 'UploadOfferCourses',
                path: '/UploadOfferCourses',
                title: 'Upload Offerd Courses',
                translateKey: 'UploadOfferCourses',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
          
            {
                key: 'ViewSuggestedCourses',
                path: '/ViewSuggestedCourses',
                title: 'View Suggested Courses',
                translateKey: 'ViewSuggestedCourses',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
            {
                key: 'NotifyStudent',
                path: '/NotifyStudent',
                title: 'NotifyStudent',
                translateKey: 'NotifyStudent',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
        ],
    },
    //registerer
    {
        key: 'registerer',
        path: '',
        title: 'registerer Menu',
        translateKey: 'nav.ChairmanMenu.ChairmanMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['registerer'],
        subMenu: [
            {
                key: 'MangeColleges',
                path: '/MangeColleges',
                title: 'Mange Colleges',
                translateKey: 'GenrateSchedule',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
            {
                key: 'MangeDepartment',
                path: '/MangeDepartment',
                title: 'MangeDepartment',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'MangeDepartmentCourses',
                path: '/MangeDepartmentCourses',
                title: 'Mange Department Courses',
                translateKey: 'UploadOfferCourses',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
            {
                key: 'NotifyChairman',
                path: '/NotifyChairman',
                title: 'Notify Chairman',
                translateKey: 'UploadOfferCourses',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [],
            },
        ],
    },
];

export default navigationConfig;
