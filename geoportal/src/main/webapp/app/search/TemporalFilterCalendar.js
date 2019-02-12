/* See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Esri Inc. licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(["dojo/_base/declare",
        "dijit/Calendar",
        "app/common/Templated",
        "app/common/ModalDialog",
        "dojo/text!./templates/TemporalFilterCalendar.html",
        "dojo/i18n!app/nls/resources" ], 
function(declare, Calendar, Templated, ModalDialog, template, i18n) {
  
  var oThisClass = declare([Templated], {
    
    i18n: i18n,
    templateString: template,
    
    dialog: null,
    targetWidget: null,
    
    postCreate: function() {
      this.inherited(arguments);
    },
    
    getTitle: function() {
      if (this.targetWidget) {
        return this.targetWidget.label;
      }
      return null;
    },
    
    hideDialog: function() {
      if (this.dialog) this.dialog.hide();
    },
    
    init: function() {
      if (this.targetWidget && this.targetWidget._brushExtent) {
        if (this.targetWidget._brushExtent.length>0)
          this.startDateCalendar.setValue(this.targetWidget._brushExtent[0]);
        if (this.targetWidget._brushExtent.length>1)
          this.endDateCalendar.setValue(this.targetWidget._brushExtent[1]);
      }
    },
    
    focus: function() {
      // this.componentLabelInput.focus();
    },
    
    showDialog: function() {
      var self = this, dialog = null;
      this.init();
      this.dialog = dialog = new ModalDialog({
        content: this.domNode,
        title: this.getTitle(),
        onHide: function() {
          self.destroyRecursive(false);
        }, 
        onShow: function() {
          self.focus();
        },
        onOkClicked: function() {
          self.validateAndApply();
        }
      });
      dialog.show();
    },
    
    validateAndApply: function() {
      if (!this.targetWidget._brushExtent) {
        this.targetWidget._brushExtent = [];
      }
      this.targetWidget._brushExtent[0] = this.startDateCalendar.value;
      this.targetWidget._brushExtent[1] = this.endDateCalendar.value;
      this.targetWidget.applyBrushExtent();
      this.hideDialog();
    }
    
  });
  
  return oThisClass;
});