import { useEffect, useState } from 'react';
import UserPanelNotification from './UserPanelNotification';
import { moveChangedStatusToEnd } from '../../helpers/helper';
import { useStoreon } from 'storeon/react';
import { v4 as uuidv4 } from 'uuid';

const UserPanelMainModeNotification = () => {
  const { messages } = useStoreon('messages');
  const { error } = useStoreon('error')
  const [notice, setNotice] = useState([
    // {
    //   id: 0,
    //   text: {
    //     title: 'Последний день для выкупа.',
    //     description: 'У карты «Москва» с поля № 2567 осталось 24ч для выкупа. Стоимость выкупа сейчас 7,5 $. ',
    //   },
    //   color: ['#AE8EF3', '#FF7EBC'],
    //   status: 'unread',
    //   redirectTo: '/auction'
    // },
    // {
    //   id: 1,
    //   text: {
    //     title: 'Включен режим основного режима',
    //     description: 'Включен режим основного режима, в котором вы можете играть с любыми другими игроками.',
    //   },
    //   color: ['#AE8EF3', '#FF7EBC'],
    //   status: 'unread',
    //   redirectTo: '/where?'
    // },
    // Add more notice messages if needed
  ])

  useEffect(()=>{
    if(error !== null && error !==undefined){
        setNotice(state=>([          
          ...state,
        ...[{
          id: uuidv4(),
          text: {
            title: error.type,
            description: error.payload[0],
          },
          color: ['#FF7EBC', '#9E87F0'],
          status: 'unread',
          // redirectTo: '/where?'
        }],
      ]
        
      ))
    }
  }, [error]);

  useEffect(()=>{
    if (messages !== null && messages !==undefined && messages.length){
      console.log({messages})
        setNotice(state=>([          
          ...[{
            id: uuidv4(),
            text: {
              title: messages[0]?.title ?? 'notice ',
              description: messages[0]?.desc ?? 'text notification',
            },
            color: ['#FF7EBC', '#9E87F0'],
            status: 'unread',
            redirectTo: '/where?'
          }],
          ...state,
        ]
        
      ))
    }
  }, [messages]);

  const handleActionNotification = (route, id) => {
    if(route === 'close'){
      return setNotice(state => (moveChangedStatusToEnd(state?.map( n => n.id === id? {...n,status: 'read'} : n), 'read')))
    }
    setNotice(state => (moveChangedStatusToEnd(state?.map( n => n.id === id? {...n,status: 'read'} : n), 'read')))
    alert('должны перейти в ...')
  }
  return (
    <UserPanelNotification 
      notice={notice}
      handleActionNotification={handleActionNotification}
    />
  )
}

export default UserPanelMainModeNotification;