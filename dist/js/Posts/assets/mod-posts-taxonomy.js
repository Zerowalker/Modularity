jQuery(document).ready(function(s){function t(t){0===s('#modularity-sorted-by select optgroup[label="Post fields"]').length&&s("#modularity-sorted-by select").prepend('<optgroup label="Post fields">').append("</optgroup>"),s("#modularity-latest-meta-key label, #modularity-sorted-by label").prepend('<span class="spinner" style="visibility: visible; float: none; margin: 0 5px 0 0;"></span>'),s.post(ajaxurl,t,function(l){s('#modularity-sorted-by select option[value^="_metakey_"], #modularity-sorted-by select optgroup[label="Post meta"]').remove(),s("#modularity-latest-meta-key select").empty(),2<l.meta_keys.length&&(s("#modularity-sorted-by select").append('<optgroup label="Post meta">'),s.each(l.meta_keys,function(t,e){var a=null!=l.sort_curr&&e.meta_key==l.sort_curr.replace("_metakey_","")?"selected":"",o=null!=l.filter_curr&&e.meta_key==l.filter_curr.replace("_metakey_","")?"selected":"";s("#modularity-sorted-by select").append('<option value="_metakey_'+e.meta_key+'" '+a+">"+e.meta_key+"</option>"),s("#modularity-latest-meta-key select").append('<option value="'+e.meta_key+'" '+o+">"+e.meta_key+"</option>")}),s("#modularity-sorted-by select").append("</optgroup>")),s("#modularity-latest-meta-key .spinner, #modularity-sorted-by .spinner").remove()},"json")}function e(t){s("#modularity-latest-taxonomy select").empty(),s("#modularity-latest-taxonomy .acf-label label").prepend('<span class="spinner" style="visibility: visible; float: none; margin: 0 5px 0 0;"></span>'),s.post(ajaxurl,t,function(o){0!==o.types.length?(s.each(o.types,function(t,e){var a=e.name==o.curr?"selected":"";s("#modularity-latest-taxonomy select").append('<option value="'+e.name+'" '+a+">"+e.label+"</option>")}),s("#modularity-latest-taxonomy .acf-label label .spinner").remove(),a({action:"get_taxonomy_values_v2",tax:s("#modularity-latest-taxonomy select").val(),post:modularity_current_post_id})):s("#modularity-latest-taxonomy .acf-label label .spinner").remove()},"json")}function a(t){s("#modularity-latest-taxonomy-value select").empty(),s("#modularity-latest-taxonomy-value .acf-label label").prepend('<span class="spinner" style="visibility: visible; float: none; margin: 0 5px 0 0;"></span>'),s.post(ajaxurl,t,function(o){s.each(o.tax,function(t,e){var a=e.slug==o.curr?"selected":"";s("#modularity-latest-taxonomy-value select").append('<option value="'+e.slug+'" '+a+">"+e.name+"</option>")}),s("#modularity-latest-taxonomy-value .acf-label label .spinner").remove()},"json")}"mod-posts"===pagenow&&(t({action:"get_sortable_meta_keys_v2",posttype:s("#modularity-latest-post-type select").val(),post:modularity_current_post_id}),s("#modularity-latest-post-type select").on("change",function(){t({action:"get_sortable_meta_keys_v2",posttype:s(this).val(),post:modularity_current_post_id})}),e({action:"get_taxonomy_types_v2",posttype:s("#modularity-latest-post-type select").val(),post:modularity_current_post_id}),s("#modularity-latest-post-type select").on("change",function(){e({action:"get_taxonomy_types_v2",posttype:s(this).val(),post:modularity_current_post_id})}),s("#modularity-latest-taxonomy select").on("change",function(){a({action:"get_taxonomy_values_v2",tax:s(this).val(),post:modularity_current_post_id})}))});