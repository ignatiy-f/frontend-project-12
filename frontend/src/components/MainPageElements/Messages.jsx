import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { selectors } from '../../slices/messagesSlice';

const Messages = () => {
  filter.loadDictionary('ru');
  const { t } = useTranslation();
  const { currentChannel, currentChannelId } = useSelector(({ channels }) => {
    const { curChannelId, channelsList } = channels;
    const curChannel = channelsList.find(({ id }) => id === curChannelId);
    return { currentChannel: curChannel, currentChannelId: curChannelId };
  });
  const curChannelName = currentChannel ? currentChannel.name : 'general';
  const messages = useSelector(selectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${filter.clean(curChannelName)}`}</b>
        </p>
        <span className="text-muted">{t('main.message', { count: messages.length })}</span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {messages.map(({ body, username, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {': '}
            {filter.clean(body)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;