import { useState, useCallback } from "react";

const useAccountSettingsForm = () => {
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateUsernameAlert, setUpdateUsernameAlert] = useState(null);
  const [updateUserEmailAlert, setUpdateUserEmailAlert] = useState(null);

  const clearSettingsFormStates = useCallback( () => {
    setUpdateUsernameAlert(null);
    setUpdateUserEmailAlert(null);
    setShowDeleteConfirm(false);
    setIsEditingEmail(false);
    setIsEditingUserName(false);
  }, []);
  

  return ({
    isEditingUserName,
    setIsEditingUserName,
    isEditingEmail,
    setIsEditingEmail,
    showDeleteConfirm,
    setShowDeleteConfirm,
    updateUsernameAlert,
    setUpdateUsernameAlert,
    updateUserEmailAlert,
    setUpdateUserEmailAlert,
    clearSettingsFormStates,
  });
};

export default useAccountSettingsForm;
