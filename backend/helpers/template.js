const { messageLink } = require("./messages")

function geForgetPasswordTemplate(code) {
    console.log(`>>>>>>>>>>>>>>>>>>0`,code)
    const option = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                Let’s secure your account.</h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                Please use this verification code to reset your password
                                                </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff" style="padding:15px 80px;" class="resp-plr">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table cellpadding="0" cellspacing="0" class="es-center" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="es-hidden" width="60"></td>
                                                        <td width="80" class="es-m-p20b esd-container-frame" align="center" style="padding: 0px 5px;">
                                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" class="esd-block-text">
                                                                            <p class="code-main" style="font-size: 34px; font-weight:bold; line-height: 100%;margin: 0; color:#ed7c31;">${code}</p>
                                                                            <table border="0" width="80%" height="100%" cellpadding="0" cellspacing="0" class=" cke_show_border">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="border-bottom: 2px solid #cccccc; background: none; height: 1px; width: 100%; margin: 0px;"><br></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>



                                                        <td class="es-hidden" width="60"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`

    return option;
}

const contactEmailTemplate = (name, email, phone, subject, message) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact</title>
  </head>
  <body>
    <div>
      <h1>Hello ${name},</h1><br />
      <h3>Your details is given below</h3><br />
      <p> Email: ${email} <br>
          Phone: ${phone} <br>
          Subject: ${subject} <br>
          Message: ${message} <br>
      </p>
    </div>
  </body>
  </html>
  `;

  return html;
}


const quizUrlTemplate = (url) => {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact</title>
  </head>
  <body>
    <div>
      <h3>Hello, The quiz results are given below</h3><br />
      <p> Your Her PLAN custom Quiz results are available at this link: <a href="${url.replace(/"/g, '\'')}" target="_blank">${url}</a> <br />
      </p>
    </div>
  </body>
  </html>
  `;

    return html;
}

async function appointmentStatus(){
    const linkD  = messageLink.APPOINTMENTS
    const body = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div style="text-align: center">
      <div
        style="
          background-color: lightslategrey;
          height: 500px;
          width: 600px;
          margin: auto;
          display: flex;
          justify-content: center;
        "
      >
        <div
          style="
            width: 500px;
            height: 300px;
            background-color: white;
            margin: auto;
          "
        >
          <div
            style="
              color: rgb(42,31,31);
              text-align: center;
              font-weight: bold;
              font-size: 25px;
              margin-top: 10px;
              font-family: sans-serif;
              line-height: 1.5;
            "
          >
          You have an appointment request waiting for you in your Her PLAN appointment portal. Please click <a href=${linkD}>here</a> to go to your messages to view and respond.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`
    return body;
}

function appointmentUpdateStatus(){
    const linkD  = messageLink.APPOINTMENTS
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div style="text-align: center">
      <div
        style="
          background-color: lightslategrey;
          height: 500px;
          width: 600px;
          margin: auto;
          display: flex;
          justify-content: center;
        "
      >
        <div
          style="
            width: 500px;
            height: 300px;
            background-color: white;
            margin: auto;
          "
        >
          <div
            style="
              color: rgb(42,31,31);
              text-align: center;
              font-weight: bold;
              font-size: 25px;
              margin-top: 10px;
              font-family: sans-serif;
              line-height: 1.5;
            "
          >
            A provider has responded to your appointment request. Click <a href=${linkD}>here</a> and go to your appointments to view and respond.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`
}


function approvedProvider(){
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                Your organization has been added to our map. If you have a Her PLAN account please <a href="${messageLink.LOGIN}">log in</a>
</h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                 If you have not yet created a Her PLAN account you can create an account <a href="${messageLink.REGISTER}">here</a>. Creating an account allows you to turn ON appointments and messages in order to receive or send secure information using this platform. In addition to messages and appointments, you can create your own lists of providers, searches, and quiz results.
                                                </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">You can also view your listing directly without an account at HerPLAN.org.
                                                </h2>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td bgcolor="#ffffff" style="padding:12px 15px;">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table >
                                                <tbody>
                                                    <td  >
                                                                            <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Sincerely</p>
                                                                             <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Her PLAN</p>

                                                                        </td>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`
}


function approvedProviderUser(){
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                You have been approved as a provider user in the Her PLAN directory! <a href="https://directory.herplan.org/login" target="_blank">Click here to login </a> . You can now save lists and searches of providers, save custom quiz results, and directly message other providers on the platform. Please be sure to turn on appointments and messages.
</h2>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td bgcolor="#ffffff" style="padding:12px 15px;">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table >
                                                <tbody>
                                                    <td  >
                                                                            <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Sincerely</p>
                                                                             <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Her PLAN</p>

                                                                        </td>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`
}

function approvedGeneralUser() {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                Thank you for becoming a user of the Her PLAN directory. We invite you to explore your profile settings first. You must turn ON appointments and Messages in order to receive or send secure information using this platform. In addition to messages and appointments, you can create your own lists of providers, searches, and quiz results.
</h2>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td bgcolor="#ffffff" style="padding:12px 15px;">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table >
                                                <tbody>
                                                    <td  >
                                                                            <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Sincerely</p>
                                                                             <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Her PLAN</p>

                                                                        </td>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`
}

function content(lines){
    let bodyHtml = ''
    for(let line of lines){
        bodyHtml += `<tr>
                        <td align="center" bgcolor="#ffffff" style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                         <h2 style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                            ${line} </h2>
                         </td>
                      </tr>`
    }
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          ${bodyHtml}

                                          <tr>
                                            <td bgcolor="#ffffff" style="padding:12px 15px;">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table >
                                                <tbody>
                                                    <td  >
                                                                            <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Sincerely</p>
                                                                             <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Her PLAN</p>

                                                                        </td>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`
}

function messageToUser(){
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="width:100%;font-family: 'Libre Franklin';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">

  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New email</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">

    <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <style type="text/css">
      body {
        font-family: 'Libre Franklin', sans-serif !important;
        color: #7f7f7f;
      }

      body,
      td,
      input,
      textarea,
      select {
        font-family: 'Libre Franklin';
      }

      * {
        font-family: 'Libre Franklin';
      }

      #outlook a {
        padding: 0;
      }

      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }

      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }

      @media only screen and (max-width:600px) {

        p,
        ul li,
        ol li,
        a {
          font-size: 16px !important;
          line-height: 150% !important
        }

        h2 {
          font-size: 26px !important;
          text-align: center;
          line-height: 140% !important
        }

        h2 a {
          font-size: 26px !important
        }
        p.code-main  {font-size: 24px !important}

        .resp_content,
        .resp_content a {
          font-size: 24px !important;
          line-height: 150% !important;
        }

        .resp_content.small-text {
          font-size: 14px !important;
        }

        .resp-pl {
          padding-left: 30px !important;
        }

        .resp-plr {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }

        .resp-plr15 {
          padding-left: 15px !important;
          padding-right: 15px !important;
        }

        .resp-width {
          width: 150px !important;
        }

        .es-content table .resp_border {
          width: 280px !important;
        }

        .es-menu td a {
          font-size: 16px !important
        }

        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }

        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }

        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }

        *[class="gmail-fix"] {
          display: none !important
        }

        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }

        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }

        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }

        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }

        .es-button-border {
          display: block !important
        }

        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }

        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }

        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }

        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }

        .adapt-img {
          width: 90% !important;
          height: auto !important
        }

        .es-m-p0 {
          padding: 0px !important
        }

        .es-m-p0r {
          padding-right: 0px !important
        }

        .es-m-p0l {
          padding-left: 0px !important
        }

        .es-m-p0t {
          padding-top: 0px !important
        }

        .es-m-p0b {
          padding-bottom: 0 !important
        }

        .es-m-p20b {
          padding-bottom: 20px !important
        }

        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }

        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }

        tr.es-desk-hidden {
          display: table-row !important
        }

        table.es-desk-hidden {
          display: table !important
        }

        td.es-desk-menu-hidden {
          display: table-cell !important
        }

        .es-menu td {
          width: 1% !important
        }

        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }

        table.es-social {
          display: inline-block !important
        }

        table.es-social td {
          display: inline-block !important
        }

        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: block !important;
          border-width: 10px 0px 10px 0px !important
        }
      }
    </style>
  </head>

  <body
    style="width:100%;font-family: 'Libre Franklin', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#f6f6f6"></v:fill>
                      </v:background>
                  <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
        style="font-family: 'Libre Franklin', sans-serif !important;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tbody>

          <tr>
            <td valign="top" style="padding:0;Margin:0">
              <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                <tbody>

                  <tr>
                    <td align="center" style="padding:0;Margin:0">
                      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                        <tbody>

                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="Margin:0;padding: 40px 20px;background-color:#F2F2F2">
                              <table cellspacing="0" cellpadding="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#F2F2F2"
                                        role="presentation">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#F2F2F2"
                              style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>

                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#ffffff"
                                              style="padding-bottom:15px;padding-left: 15px;padding-right: 15px;padding-top: 15px;Margin:0;">
                                              <h2
                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:28px;font-family:'Libre Franklin', sans-serif;line-height:noraml;color:#7f7f7f; font-weight: 400;">
                                                You have a message waiting for you in your Her PLAN message portal. Please <a href="${messageLink.MESSAGE}">click here</a> to go to your messages to view and respond.
</h2>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td bgcolor="#ffffff" style="padding:12px 15px;">
                                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="145" valign="top"><![endif]-->
                                              <table >
                                                <tbody>
                                                    <td  >
                                                                            <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Sincerely</p>
                                                                             <p  style="font-size: 22px; font-weight:bold; line-height: 100%;margin: 0;">Her PLAN</p>

                                                                        </td>
                                                </tbody>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            </td>
                                          </tr>

                                        </tbody>

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" bgcolor="#f2f2f2"
                              style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:20px;background-color:#F2F2F2">
                              <table cellpadding="0" cellspacing="0" width="100%"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">

                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </td>
                  </tr>
                </tbody>

              </table>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </body>

  </html>`
}
module.exports = {
    geForgetPasswordTemplate,
    contactEmailTemplate,
    quizUrlTemplate,
    appointmentStatus,
    approvedProvider,
    approvedProviderUser,
    content,
    appointmentUpdateStatus,
    messageToUser
}
