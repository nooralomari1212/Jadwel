import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import {
    Avatar,
    Dropdown,
    ScrollBar,
    Spinner,
    Badge,
    Button,
    Tooltip,
} from 'components/ui'
import { HiOutlineBell, HiOutlineMailOpen } from 'react-icons/hi'
import {
    apiGetNotificationList,
    apiGetNotificationCount,
} from 'services/CommonService'
import { Link } from 'react-router-dom'
import isLastChild from 'utils/isLastChild'
import useTwColorByName from 'utils/hooks/useTwColorByName'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useSelector } from 'react-redux'
import useResponsive from 'utils/hooks/useResponsive'
import acronym from 'utils/acronym'
import {
    HiOutlineCalendar,
    HiOutlineClipboardCheck,
    HiOutlineBan,
} from 'react-icons/hi'

const notificationHeight = 'h-72'
const imagePath = '/img/avatars/'

const GeneratedAvatar = ({ full_name }) => {
    const color = useTwColorByName()
    return (
        <Avatar shape="circle" className={`${color(full_name)}`}>
            {acronym(full_name)}
        </Avatar>
    )
}

const NotificationToggle = ({ className, dot }) => {
    return (
        <div className={classNames('text-2xl', className)}>
            {dot ? (
                <Badge badgeStyle={{ top: '3px', right: '6px' }}>
                    <HiOutlineBell />
                </Badge>
            ) : (
                <HiOutlineBell />
            )}
        </div>
    )
}

export const Notification = ({ className }) => {
    const [notificationList, setNotificationList] = useState([])
    const [unreadNotification, setUnreadNotification] = useState(false)
    const [noResult, setNoResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null)

    const { bgTheme } = useThemeClass()

    const { larger } = useResponsive()

    const direction = useSelector((state) => state.theme.direction)

    const getNotificationCount = useCallback(async () => {
        const resp = await apiGetNotificationCount()
        if (resp.data.count > 0) {
            setNoResult(false)
            setUnreadNotification(true)
        } else {
            setNoResult(true)
        }
    }, [])

    useEffect(() => {
        getNotificationCount()
    }, [getNotificationCount])

    const onNotificationOpen = useCallback(async () => {
        if (notificationList.length === 0) {
            setLoading(true)
            const resp = await apiGetNotificationList()
            setLoading(false)
            setNotificationList(resp.data)
        }
    }, [notificationList])

    const onMarkAllAsRead = useCallback(() => {
        const list = notificationList.map((item) => {
            if (!item.readed) {
                item.readed = true
            }
            return item
        })
        setNotificationList(list)
        setUnreadNotification(false)
    }, [notificationList])

    const onMarkAsRead = useCallback(
        (id) => {
            const list = notificationList.map((item) => {
                if (item.id === id) {
                    item.readed = true
                }
                return item
            })
            setNotificationList(list)
            const hasUnread = list.some((item) => !item.readed)

            if (!hasUnread) {
                setUnreadNotification(false)
            }
        },
        [notificationList]
    )

    const showMessage = useCallback((message) => {
        setSelectedMessage(message)
    }, [])

    const hideMessage = useCallback(() => {
        setSelectedMessage(null)
    }, [])

    return (
        <Dropdown
            renderTitle={
                <NotificationToggle
                    dot={unreadNotification}
                    className={className}
                />
            }
            menuClass="p-0 min-w-[280px] md:min-w-[340px]"
            placement={larger.md ? 'bottom-end' : 'bottom-center'}
            onOpen={onNotificationOpen}
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                    <h6>Notifications</h6>
                    <Tooltip title="Mark all as read">
                        <Button
                            variant="plain"
                            shape="circle"
                            size="sm"
                            icon={<HiOutlineMailOpen className="text-xl" />}
                            onClick={onMarkAllAsRead}
                        />
                    </Tooltip>
                </div>
            </Dropdown.Item>
            <div className={classNames('overflow-y-auto', notificationHeight)}>
                <ScrollBar direction={direction}>
                    {notificationList.length > 0 &&
                        notificationList.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
                                    !isLastChild(notificationList, index)
                                        ? 'border-b border-gray-200 dark:border-gray-600'
                                        : ''
                                }`}
                                onClick={() => {
                                    onMarkAsRead(item.id)
                                    showMessage(item)
                                }}
                            >
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <div>
                                        {item.full_name && (
                                            <span className="font-semibold heading-text">
                                                {item.full_name}{' '}
                                            </span>
                                        )}
                                        <span>{item.title}</span>
                                    </div>
                                    <span className="text-xs">
                                        {item.publish_date}
                                    </span>
                                </div>
                                <Badge
                                    className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                                    innerClass={`${
                                        item.readed ? 'bg-gray-300' : bgTheme
                                    } `}
                                />
                            </div>
                        ))}
                    {loading && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <Spinner size={40} />
                        </div>
                    )}
                    {noResult && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <div className="text-center">
                                <img
                                    className="mx-auto mb-2 max-w-[150px]"
                                    src="/img/others/no-notification.png"
                                    alt="no-notification"
                                />
                                <h6 className="font-semibold">
                                    No notifications!
                                </h6>
                                <p className="mt-1">Please Try again later</p>
                            </div>
                        </div>
                    )}
                </ScrollBar>
            </div>

            {selectedMessage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                    onClick={hideMessage}
                >
                    <div className="bg-white p-8 max-w-full h-full fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-start items-start">
                        <h3 className="text-lg font-semibold mb-4">
                            {selectedMessage.title}
                        </h3>
                        <div className="border-t-2 border-gray-300"></div>
                        <p style={{ wordBreak: 'break-word' }}>
                            {selectedMessage.message}
                        </p>
                    </div>
                </div>
            )}
        </Dropdown>
    )
}

export default withHeaderItem(Notification)
