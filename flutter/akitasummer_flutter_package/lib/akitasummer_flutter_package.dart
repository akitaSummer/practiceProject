library akitasummer_flutter_package;

import 'dart:ui';

class ColorUtil {
  static const int BLACK = 0xFF000000;
  static const int DKGRAY = 0xFF444444;
  static const int GRAY = 0xFF888888;
  static const int LTGRAY = 0xFFCCCCCC;
  static const int WHITE = 0xFFFFFFFF;
  static const int RED = 0xFFFF0000;
  static const int GREEN = 0xFF00FF00;
  static const int BLUE = 0xFF0000FF;
  static const int YELLOW = 0xFFFFFF00;
  static const int CYAN = 0xFF00FFFF;
  static const int MAGENTA = 0xFFFF00FF;
  static const int TRANSPARENT = 0;

  static int intColor(String colorString) {
    if (colorString?.isEmpty ?? true) {
      throw ArgumentError('Unknown color');
    }
    if (colorString[0] == '#') {
      int color = int.tryParse(colorString.substring(1), radix: 16);
      if (colorString.length == 7) {
        // alpha value
        color |= 0x00000000ff000000;
      } else if (colorString.length != 9) {
        throw ArgumentError('Unknown color');
      }
      return color;
    } else {
      int color = sColorNameMap[(colorString.toLowerCase())];
      if (color != null) {
        return color;
      } else {
        return intColor('#' + colorString);
      }
    }
  }

  static Color color(String colorString) {
    return Color(intColor(colorString));
  }

  static const sColorNameMap = {
    'black': BLACK,
    'darkgray': DKGRAY,
    'gray': GRAY,
    'lightgray': LTGRAY,
    'white': WHITE,
    'red': RED,
    'green': GREEN,
    'blue': BLUE,
    'yellow': YELLOW,
    'cyan': CYAN,
    'magenta': MAGENTA,
    'aqua': 0xFF00FFFF,
    'darkgrey': DKGRAY,
    'grey': GRAY
  };
}
