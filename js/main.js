import * as acessoWebFrame from './unico-webframe.min.js'

function getHostUrlBase(path) {
  return window.location.protocol + "//" + window.location.host + "/" + path;
}

document.addEventListener("DOMContentLoaded", () => {

  var urlPathModels = getHostUrlBase("models");

  var configurations = {
    TYPE: 1,
    optional: {
      FACE_MODE: 1,
      LABEL_DOCUMENT_TYPE_OTHERS: "doc",
    }
  }

  var callback = {
    on: {
      success: function (obj) {
        window.console.log(obj);
        window.alert(`capturado com sucesso`);
      },
      error: function (error) {
        window.console.log(error);
        window.alert(`
          Câmera fechada
          ------------------------------------
          Motivo: ${error.code} - ${error.message} ${JSON.stringify(error.stack)}
        `);
      },
      support: function (error) {
        console.log(error);
        /*
        Neste caso estamos adicionando de maneira hardcoded porém o 
        ideal é sempre verificar através da variável error.stack[0].listBrowsersSupport
        onde conterá todos os Browsers suportados de acordo com a plataforma que o usuário
        está usando. Usando hardcoded corre o risco de em futuras versões, 
        suporte em determinados browsers podem ser removidos ou adicionados.
        Para mais detalhes consulte nossa documentação.
        */
        window.alert(`
          Browser não suportado 
          ------------------------------------
          iOS: Safari
          Android/Windows: Chrome, Firefox
        `);
      }
    }
  };

  var layout = {
    silhouette: {
      primaryColor: "#0bbd26",
      secondaryColor: "#bd0b0b",
      neutralColor: "#fff",
    },
    buttonCapture: {
      backgroundColor: "#2980ff",
      iconColor: "#fff",
    },
    popupLoadingHtml: `<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Loading...</div>`,
    boxMessage: {
      backgroundColor: "#2980ff",
      fontColor: "#fff"
    },
    boxDocument: {
      backgroundColor: "#2980ff",
      fontColor: "#fff"
    }
  }

  acessoWebFrame.initCamera(configurations, callback, layout);

  //  acessoWebFrame.webFrameModel
  //    .loadModelsCameraInteligence(urlPathModels)
  //    .then(() => {
  //   acessoWebFrame.initCamera(configurations, callback, layout);
  //    })
  //    .catch((error) => {
  //      console.error(error);
  //      window.alert(`
  //          ${error.message}
  //        `);
  //    });

  //acessoWebFrame.initDocument(configurations, callback, layout);
});