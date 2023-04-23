import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';

const modals = {
  adding: AddModal,
  renaming: RenameModal,
  removing: RemoveModal,
};

export default (modalName) => modals[modalName];