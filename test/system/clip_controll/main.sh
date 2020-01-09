#README
#run this shell automater shortcut.

cd `dirname $0`;
#methods
_alert(){ osascript -e "display notification \"$1\" with title \"$2\""; }
_output(){ pbcopy < $1; }
_input(){ pbpaste > $1; }
_date(){ echo `date "+%Y%m%d-%H%M%S"`; }

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
_prev(){
  current=`cat session.txt`;
  file_name=`ls ./clips|grep -1 $current|tail -1`;
  echo $file_name > session.txt;
  _output "./clips/${file_name}";
  _alert "Prev: `cat ./clips/${file_name}|head -1`" "clip_controll";
}
_current(){
  current=`cat session.txt`;
  _output "./clips/${current}";
  _alert "Current: `cat ./clips/${file_name}`" "clip_controll";
}
_next(){
  current=`cat session.txt`;
  file_name=`ls ./clips|grep -1 $current|head -1`;
  echo $file_name > session.txt;
  _output "./clips/${file_name}";
  _alert "Next: `cat ./clips/${file_name}|head -1`" "clip_controll";
}

case $1 in
  "init") _init;;
  "open") _open;;
  "save") _save;;
  "prev") _prev;;
  "current") _current;;
  "next") _next;;
esac
