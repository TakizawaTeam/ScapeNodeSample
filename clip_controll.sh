#README
#run this shell automater shortcut.

#methods
_alert(){ osascript -e "display notification \"$1\" with title \"$2\""; }
_output(){ pbcopy < $1; }
_input(){ pbpaste > $1; }
_date(){ echo `date "+%Y%m%d-%H%M%S"`; }

_init(){
  touch session.txt;
  mkdir clips; 
  _alert "initialize!" "clip_controll";
}
_open(){ open "./clips"; }
_save(){
  file_path="./clips/`_date`.txt";
  _input $file_path;
  first_str=`head -n 1 $file_path`;
  _alert $first_str "clip_controll:save";
}
_prev(){ echo "prev[TBI]"; }
_next(){ echo "open[TBI]"; }

case $1 in
  "init") _init;;
  "open") _open;;
  "save") _save;;
  "prev") _prev;;
  "next") _next;;
esac

