import { useState, useCallback } from "react";

const useAccountSettingsForm = () => {
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateUsernameAlert, setupdateUsernameAlert] = useState(null);
  const [updateUserEmailAlert, setupdateUserEmailAlert] = useState(null);

  const clearSettingsFormStates = useCallback( () => {
    setupdateUsernameAlert(null);
    setupdateUserEmailAlert(null);
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
    setupdateUsernameAlert,
    updateUserEmailAlert,
    setupdateUserEmailAlert,
    clearSettingsFormStates,
  });
};

export default useAccountSettingsForm;
