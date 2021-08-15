declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  AudioContext: AudioContext;
  webkitAudioContext: AudioContext;
}

