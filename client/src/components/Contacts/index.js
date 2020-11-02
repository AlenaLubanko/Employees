import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FaceIcon from '@material-ui/icons/Face';

function Contacts() {
  return (
    <>
      <table>
        <tr>
          <td>
            <label><FaceIcon /></label>
          </td>
          <td>Приложение разработано: Alena Lubanko</td>
        </tr>
        <tr>
          <td>
            <label><PhoneAndroidIcon /></label>
          </td>
          <td>8-953-512-93-74</td>
        </tr>
        <tr>
          <td>
            <label><MailIcon /></label>
          </td>
          <td>alena.lubanko@yandex.ru</td>
        </tr>
      </table>
    </>
  )
}

export default Contacts;