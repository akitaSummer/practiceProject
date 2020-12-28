package com.example.flutter_hybrid_android;

public interface IShowMessage {
    void onShowMessage(String message);
    void sendMessage(String message,boolean useEventChannel);
}
