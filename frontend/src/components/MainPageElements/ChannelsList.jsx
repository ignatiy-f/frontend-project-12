import React from 'react';
import {
  Button, Dropdown, Nav, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as modalActions } from '../../slices/modalSlice';

const ChannelsList = () => {
  filter.loadDictionary('ru');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsList = useSelector(({ channels }) => channels.channelsList);
  const curChannelId = useSelector(({ channels }) => channels.curChannelId);
  return (
    <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
      {channelsList.map(({ id, name, removable }) => {
        const removeChannel = () => {
          dispatch(modalActions.setModalType('removing'));
          dispatch(modalActions.setHandledChannelId(id));
        };
        const renameChannel = () => {
          dispatch(modalActions.setModalType('renaming'));
          dispatch(modalActions.setHandledChannelId(id));
        };

        return (
          <Nav.Item as="li" className="w-100" key={id}>
            {!removable && (
            <Button
              className="w-100 rounded-0 text-start"
              variant={id === curChannelId ? 'secondary' : ''}
              onClick={() => dispatch(channelsActions.setCurChannelId(id))}
            >
              <span className="me-1">#</span>
              {filter.clean(name)}
            </Button>
            )}
            {removable && (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                className="w-100 rounded-0 text-start text-truncate"
                variant={id === curChannelId ? 'secondary' : ''}
                onClick={() => dispatch(channelsActions.setCurChannelId(id))}
              >
                <span className="me-1">#</span>
                {filter.clean(name)}
              </Button>
              <Dropdown.Toggle
                split
                variant={id === curChannelId ? 'secondary' : ''}
                className="flex-grow-0"
              >
                <span className="visually-hidden">{t('main.control')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={removeChannel}>{t('main.remove')}</Dropdown.Item>
                <Dropdown.Item onClick={renameChannel}>{t('main.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default ChannelsList;