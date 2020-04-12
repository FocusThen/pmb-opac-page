// +-------------------------------------------------+
// � 2002-2004 PMB Services / www.sigb.net pmb@sigb.net et contributeurs (voir www.sigb.net)
// +-------------------------------------------------+
// $Id: ResourceSelector.js,v 1.1.2.4 2019/11/18 10:56:03 jlaurent Exp $


define([
        'dojo/_base/declare',
        'dijit/_WidgetBase',
        'dojo/on',
        'dojo/_base/lang',
        'dojo/request',
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/dom-attr'
], function(declare, _WidgetBase, on, lang, request, dom, domConstruct, domAttr){
	return declare([_WidgetBase], {

		target: './ajax_selector.php',
		
		datalist: [],
		
		datalistNode: null,
		
		valueNode: null,
		
		lastValue: null,
		
		postCreate: function() {
			this.inherited(arguments);
			this.datalistNode = dom.byId(this.domNode.id + '_list');
			this.valueNode = dom.byId(this.valueNodeId);
			on(this.domNode, 'keyup', lang.hitch(this, this.updateDatalist));
			on(this.domNode, 'input', lang.hitch(this, this.updateValue));
		},
	
		updateDatalist: function(e) {
			if (this.domNode.value == this.lastValue) {
				return false;
			}
			this.lastValue = this.domNode.value; 
			var url = this.target+'?handleAs=json&completion='+this.completion+'&autexclude='+this.autexclude+'&param1='+this.param1+'&param2='+this.param2;
			url = url + '&datas=' + this.domNode.value;
			request.get(url, {
				handleAs: 'json'
			}).then(lang.hitch(this, function(data) {
				this.setDatalist(data);
			}), function(err){console.log(err);});
		},
		
		setDatalist: function(data) {
			domConstruct.empty(this.datalistNode);
			this.datalist = [];
			for (var element of data) {
				this.datalist[element.value] = element.label;
				domConstruct.create('option', {innerHTML: element.label}, this.datalistNode);
			}
			this.domNode.focus();
		},
		
		updateValue: function(e) {
			for (var id in this.datalist) {
				if (this.datalist[id] == this.domNode.value) {
					this.valueNode.value = id;
					this.domNode.setCustomValidity("");
					this.domNode.blur();
					return true;
				}
			}
			this.valueNode.value = '';
			this.domNode.setCustomValidity("Invalid field.");
			return false;
		}
	})
});