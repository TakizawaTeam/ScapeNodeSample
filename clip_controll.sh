#README
#run this shell automater shortcut.

#methods
_alert(){ osascript -e "display notification \"$1\" with title \"$2\""; }
_output(){ pbcopy < $1; }
_input(){ pbpaste > $1; }
_date(){ echo `date "+%Y%m%d-%H%M%S"`; }

_prev_next_name(){
  echo `ls -l ./clips|grep -1 -n 20191219-173019.txt`;
}

_init(){
  touch session.txt;
  mkdir clips;
  _alert "Initialized" "clip_controll";
}
_open(){ open "./clips"; }
_save(){
  file_name="`_date`.txt";
  file_path="./clips/${file_name}";
  echo $file_name > session.txt;
  _input $file_path;
  first_str=`head -n 1 $file_path`;
  _alert "Saved: ${first_str}" "clip_controll";
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
