import React, {useState} from 'react';
import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2';

//create an AzureInstance object with your Microsoft Azure credentials
const credentials = {
  client_id: '5c9f7b23-10cf-40ec-8dae-2c3008628c18',
  client_secret: 'cd0f494f-568e-4d05-af78-aa62165a21cd',
  scope: 'User.ReadBasic.All Mail.Read offline_access', //access scope for login - see http://bit.ly/2gtQe9W for more info
};

//create a component for Azure Authentication
const MIcroSoftBTN = () => {
  const [azureInstance, setAzureInstance] = useState(
    new AzureInstance(credentials),
  );

  // function to be called after login is successful
  const _onLoginSuccess = () => {
    azureInstance
      .getUserInfo()
      .then(result => {})
      .catch(err => {});
  };
  return (
    <AzureLoginView
      azureInstance={azureInstance}
      loadingMessage="Requesting access token"
      onSuccess={_onLoginSuccess}
    />
  );
};
export default MIcroSoftBTN;
