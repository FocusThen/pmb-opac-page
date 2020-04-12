// +-------------------------------------------------+
// � 2002-2004 PMB Services / www.sigb.net pmb@sigb.net et contributeurs (voir www.sigb.net)
// +-------------------------------------------------+
// $Id: PMBTextArea.js,v 1.1.2.1 2018/09/04 15:26:49 apetithomme Exp $


define(["dojo/_base/declare", "dijit/form/SimpleTextarea", "dojo/_base/lang", "dojo/dom-class"], function(declare, SimpleTextArea, lang, domClass){

	  return declare([SimpleTextArea], {
		  constructor: function(){
			  this.inherited(arguments);
		  },
		  _setPlaceHolderAttr: function(v){
				this.set("placeholder", v);
		  },
	  });
});