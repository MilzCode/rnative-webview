import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Platform, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import WebView from 'react-native-webview';


export default function App() {
  const url = 'https://www.google.com'
  const webViewRef = useRef(null);
  const [statusBarColor, setStatusBarColor] = useState('#000000'); // Estado inicial del color de la barra de estado

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      //console.log current url
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
    });

    return () => backHandler.remove(); // Limpia el event listener al desmontar el componente
  }, []);

  // Ejemplo de código JavaScript para inyectar en el WebView
  // Este debe adaptarse para obtener y postear el color real del elemento deseado
  const injectedJavaScript = `
  setTimeout(function() {
    var color = "#fff"
    window.ReactNativeWebView.postMessage(color);
  }, 500);
`;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor={statusBarColor} />
      <WebView
        source={{ uri:url }}
        style={styles.webview}
        ref={webViewRef}
        onMessage={(event) => {
          // Actualiza el color de la barra de estado con el color recibido desde el WebView
          console.log('Color recibido:', event.nativeEvent.data);
          setStatusBarColor(event.nativeEvent.data);
        }}
        injectedJavaScript={injectedJavaScript}
        onLoad={() => webViewRef.current?.injectJavaScript(injectedJavaScript)} // Inyecta el JS cada vez que se carga una nueva página
        onNavigationStateChange={(navState) => {
          // Verifica si la URL actual es de un dominio diferente al deseado
          if(!navState.url.toString().includes(url)) {
            //detener carga
            // webViewRef.current.stopLoading();
            // BackHandler.exitApp();
            console.log("Estas en un dominio externo")
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0, // Ajusta paddingTop según la plataforma
  },
  webview: {
    flex: 1,
  },
});
