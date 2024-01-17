import React, { useState } from 'react';
import { Card, Button } from 'components/ui';
import useThemeClass from 'utils/hooks/useThemeClass';
import { APP_NAME } from 'constants/app.constant';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi';

const quickStartList = [
  {
    label: 'Watch quick demonstration video that describes Jadwel!',
    btnText: 'Watch',
    id: '0',
    disabled: false,
    navigate: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    label: 'Create your first Schedule!',
    desc: 'Building your own schedule the way that fits your needs',
    id: '1',
    disabled: false,
  },
  {
    label: 'Trace the changes that occur on schedules',
    desc: 'Any changes that occur from chairman or admins, you will be notified',
    id: '2',
    disabled: false,
    navigate: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

const QuickStartItem = (props) => {
  const {
    title,
    desc,
    btnText,
    index,
    available,
    textTheme = '',
    borderTheme = '',
    path = '',
    callBack,
  } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    if (available) {
      callBack?.();
      if (path) {
        if (index === 0) {
          window.open(path, '_blank');
        } else {
          navigate(path);
        }
      }
    }
  };

  return (
    <Card className="mb-4">
      <div className="md:flex items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {index + 1 && (
            <span
              className={`font-semibold text-xl rounded-full border-2 min-w-[30px] h-[30px] flex items-center justify-center ${borderTheme} ${textTheme}`}
            >
              {index + 1}
            </span>
          )}
          <div>
            <h5>{title}</h5>
            <p>{desc}</p>
          </div>
        </div>
        {index === 0 ? (
          <Button
            disabled={!available}
            variant="solid"
            className="mt-4 md:mt-0"
            size="sm"
            onClick={handleClick}
          >
            {btnText}
          </Button>
        ) : (
          <span className="text-sm">{btnText}</span>
        )}
      </div>
    </Card>
  );
};

const QuickStart = () => {
  const { textTheme, borderTheme } = useThemeClass();

  const [completion] = useState([
    { value: '0', completed: false, current: true },
    { value: '1', completed: false, current: false },
    { value: '2', completed: false, current: false },
  ]);

  return (
    <div>
      <h3 className="mb-2 text-center">
        <span>🚀 Let's get you set up with </span>
        <span className={textTheme}>{APP_NAME}</span>
      </h3>
      <div className="mt-8 max-w-[800px] lg:min-w-[800px]">
        {quickStartList.map((item, index) => (
          <QuickStartItem
            index={index}
            textTheme={textTheme}
            borderTheme={borderTheme}
            key={item.id}
            title={item.label}
            btnText={item.btnText}
            desc={item.desc}
            available={completion.some(
              (c) => c.value === item.id && (c.completed || c.current)
            )}
            path={item.navigate}
            callBack={item.callBack}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickStart;
