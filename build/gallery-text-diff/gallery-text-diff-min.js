YUI.add("gallery-text-diff",function(a){a.TextDiff=a.Base.create("TextDiff",a.Base,[],{_constructSingleCharString:function(e,d){var b="",c;for(c=0;c<d;c++){b+=e;}return b;},calculateDiff:function(k,g){var l=this,c=null,h=null,f=[],b=null,e,d;if(k===g){return{diffString:this._constructSingleCharString(this.get("complianceChar"),k.length),dist:0};}else{if(g.length===0){return{diffString:this._constructSingleCharString(this.get("insertionChar"),k.length),dist:k.length};}else{if(k.length===0){return{diffString:this._constructSingleCharString(this.get("deletionChar"),g.length),dist:g.length};}}}c=k.split("");h=g.split("");for(e=0;e<=g.length;e++){f[e]=[{dist:e,diff:this._constructSingleCharString(this.get("deletionChar"),e)}];}for(d=0;d<=k.length;d++){f[0][d]={dist:d,diff:this._constructSingleCharString(this.get("insertionChar"),d)};}a.Array.each(h,function(m,j){a.Array.each(c,function(n,i){if(h[j]===c[i]){f[j+1][i+1]={dist:f[j][i]["dist"],diff:f[j][i]["diff"]+l.get("complianceChar")};}else{b={dist:f[j][i+1]["dist"]+1,diff:f[j][i+1]["diff"]+l.get("deletionChar")};if(f[j+1][i]["dist"]<b["dist"]){b={dist:f[j+1][i]["dist"]+1,diff:f[j+1][i]["diff"]+l.get("insertionChar")};}if(f[j][i]["dist"]<b["dist"]){b={dist:f[j][i]["dist"]+1,diff:f[j][i]["diff"]+l.get("substitutionChar")};}if(j>0&&i>0&&m==c[i-1]&&n==h[j-1]&&f[j-1][i-1]["dist"]<b["dist"]){b={dist:f[j-1][i-1]["dist"]+1,diff:f[j-1][i-1]["diff"]+l.get("transpositionChar")+l.get("transpositionChar")};}f[j+1][i+1]=b;}});});return{diffString:f[g.length][k.length]["diff"],dist:f[g.length][k.length]["dist"]};}},{NS:"text-diff",ATTRS:{complianceChar:{value:"_"},deletionChar:{value:"d"},insertionChar:{value:"i"},substitutionChar:{value:"s"},transpositionChar:{value:"t"}}});},"@VERSION@",{requires:["base"],skinnable:false});