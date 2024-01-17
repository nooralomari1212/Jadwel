import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: ['student', 'chairman' , 'registerer'],
    },
    // {
    //     key: 'home2',
    //     path: '/home2',
    //     component: React.lazy(() => import('views/chairmanhome')),
    //     authority: ['chairman'],
    // },
    //Student 
    {
        key: 'suggestedCourse',
        path: '/suggested-course',
        component: React.lazy(() =>
            import('views/demo/Student/SuggestedCourse')
        ),
        authority: ['student'],
    },
    {
        key: 'ViewSchedule',
        path: '/ViewSchedule',
        component: React.lazy(() => import('views/demo/Student/ViewSchedule')),
        authority: ['student'],
    },

    //Chairman
    {
        key: 'GenrateSchedule',
        path: '/GenrateSchedule',
        component: React.lazy(() =>
            import('views/demo/Chairman/GenrateSchedule')
        ),
        authority: ['chairman'],
    },
    {
        key: 'FullSchedule',
        path: '/FullSchedule',
        component: React.lazy(() =>
            import('views/demo/Chairman/FullSchedule')
        ),
        authority: ['chairman'],
    },
    {
        key: 'CompareSchedule',
        path: '/compare-schedule',
        component: React.lazy(() =>
            import('views/demo/Chairman/CompareSchedule')
        ),
        authority: ['chairman'],
    },
    // {
    //     key: 'UpoadRefrenceSchedule',
    //     path: '/UpoadRefrenceSchedule',
    //     component: React.lazy(() =>
    //         import('views/demo/Chairman/UpoadRefrenceSchedule')
    //     ),
    //     authority: [],
    // },
    {
        key: 'UploadOfferCourses',
        path: '/UploadOfferCourses',
        component: React.lazy(() =>
            import('views/demo/Chairman/UploadOfferCourses')
        ),
        authority: [],
    },
    {
        key: 'DateTimePicker',
        path: '/DateTimePicker',
        component: React.lazy(() =>
            import('views/demo/Chairman/CompareSchedule')
        ),
        authority: [],
    },
    {
        key: 'ViewSuggestedCourses',
        path: '/ViewSuggestedCourses',
        component: React.lazy(() =>
            import('views/demo/Chairman/ViewSuggestedCourses')
        ),
        authority: [],
    },
    {
        key: 'NotifyStudent',
        path: '/NotifyStudent',
        component: React.lazy(() =>
            import('views/demo/Chairman/NotifyStudent')
        ),
        authority: [],
    },
    //registerer
    {
        key: 'MangeColleges',
        path: '/MangeColleges',
        component: React.lazy(() =>
            import('views/demo/registerer/MangeColleges')
        ),
        authority: ['registerer'],
    },
    {
        key: 'MangeDepartment',
        path: '/MangeDepartment',
        component: React.lazy(() =>
            import('views/demo/registerer/MangeDepartment')
        ),
        authority: ['registerer'],
    },
    {
        key: 'MangeDepartmentCourses',
        path: '/MangeDepartmentCourses',
        component: React.lazy(() =>
            import('views/demo/registerer/MangeDepartmentCourses')
        ),
        authority: [],
    },
    {
        key: 'NotifyChairman',
        path: '/NotifyChairman',
        component: React.lazy(() =>
            import('views/demo/registerer/NotifyChairman')
        ),
        authority: [],
    },
]
