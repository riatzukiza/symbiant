function RGB2HSV(rgb) {

    var hsv = new Object();
    var max = max3(rgb.red, rgb.green, rgb.blue);
    var dif = max - min3(rgb.red, rgb.green, rgb.blue);
    hsv.saturation = (max == 0.0) ? 0 : (100 * dif / max);
    if (hsv.saturation == 0) hsv.hue = 0;
    else if (rgb.red == max) hsv.hue = 60.0 * (rgb.green - rgb.blue) / dif;
    else if (rgb.green == max) hsv.hue = 120.0 + 60.0 * (rgb.blue - rgb.red) / dif;
    else if (rgb.blue == max) hsv.hue = 240.0 + 60.0 * (rgb.red - rgb.green) / dif;
    if (hsv.hue < 0.0) hsv.hue += 360.0;
    hsv.value = Math.round(max * 100 / 255);
    hsv.hue = Math.round(hsv.hue);
    hsv.saturation = Math.round(hsv.saturation);
    return hsv;
}
module.exports.RGB2HSV = RGB2HSV

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
    var rgb = new Object();
    if (hsv.saturation == 0) {
        rgb.red = rgb.green = rgb.blue = Math.round(hsv.value * 2.55);
    } else {
        hsv.hue /= 60;
        hsv.saturation /= 100;
        hsv.value /= 100;
        var i = Math.floor(hsv.hue);
        var f = hsv.hue - i;
        var p = hsv.value * (1 - hsv.saturation);
        var q = hsv.value * (1 - hsv.saturation * f);
        var t = hsv.value * (1 - hsv.saturation * (1 - f));
        switch (i) {
            case 0:
                rgb.red = hsv.value;
                rgb.green = t;
                rgb.blue = p;
                break;
            case 1:
                rgb.red = q;
                rgb.green = hsv.value;
                rgb.blue = p;
                break;
            case 2:
                rgb.red = p;
                rgb.green = hsv.value;
                rgb.blue = t;
                break;
            case 3:
                rgb.red = p;
                rgb.green = q;
                rgb.blue = hsv.value;
                break;
            case 4:
                rgb.red = t;
                rgb.green = p;
                rgb.blue = hsv.value;
                break;
            default:
                rgb.red = hsv.value;
                rgb.green = p;
                rgb.blue = q;
        }
        rgb.red = Math.round(rgb.red * 255);
        rgb.green = Math.round(rgb.green * 255);
        rgb.blue = Math.round(rgb.blue * 255);
    }
    return rgb;
}

//Adding HueShift via Jacob (see comments)
function HueShift(h, s) {
    h += s;
    while (h >= 360.0) h -= 360.0;
    while (h < 0.0) h += 360.0;
    return h;
}

//min max via Hairgami_Master (see comments)
function min3(a, b, c) {
    return (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
}

function max3(a, b, c) {
    return (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
}
module.exports.RGB2HSV = RGB2HSV;
/* hexToComplimentary : Converts hex value to HSL, shifts
 * hue by 180 degrees and then converts hex, giving complimentary color
 * as a hex value
 * @param  [String] hex : hex value  
 * @return [String] : complimentary color as hex value
 */
function hexToComplimentary(hex){

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h+= 180;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255); 
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16); 
    return {
        red:r,
        green:g,
        blue:b
    }
}
module.exports.hexToComplimentary = hexToComplimentary;
