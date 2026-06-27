
import plugin_detail2thread_extension_display_hook from './plugin_detail@thread_extension_display_hook';
import plugin_index2thread_extension_display_hook from './plugin_index@thread_extension_display_hook';
import plugin_post2post_extension_content_hook from './plugin_post@post_extension_content_hook';
import plugin_post2post_extension_entry_hook from './plugin_post@post_extension_entry_hook';
import plugin_system2add_page_hook from './plugin_system@add_page_hook';
import plugin_user2user_extension_action_hook from './plugin_user@user_extension_action_hook';
import plugin_user2user_extension_left_layout_hook from './plugin_user@user_extension_left_layout_hook';


import plugin_global2header_replace_hook from './plugin_global@header_replace_hook';
import plugin_global2footer_replace_hook from './plugin_global@footer_replace_hook';
import plugin_index2header_insert_before_hook from './plugin_index@header_insert_before_hook';
import plugin_index2header_insert_after_hook from './plugin_index@header_insert_after_hook';
import plugin_index2header_replace_hook from './plugin_index@header_replace_hook';
import plugin_index2tabs_replace_hook from './plugin_index@tabs_replace_hook';
import plugin_index2topping_insert_before_hook from './plugin_index@topping_insert_before_hook';
import plugin_index2topping_insert_after_hook from './plugin_index@topping_insert_after_hook';
import plugin_index2topping_replace_hook from './plugin_index@topping_replace_hook';
import plugin_index2left_replace_hook from './plugin_index@left_replace_hook';
import plugin_index2right_replace_hook from './plugin_index@right_replace_hook';
import plugin_index2recommend_replace_hook from './plugin_index@recommend_replace_hook';
import plugin_index2qrcode_replace_hook from './plugin_index@qrcode_replace_hook';
import plugin_index2copyright_replace_hook from './plugin_index@copyright_replace_hook';


const INJECTION_LIST = {
    'plugin_post@post_extension_entry_hook': plugin_post2post_extension_entry_hook,
    'plugin_post@post_extension_content_hook': plugin_post2post_extension_content_hook,
    'plugin_index@thread_extension_display_hook': plugin_index2thread_extension_display_hook,
    'plugin_detail@thread_extension_display_hook': plugin_detail2thread_extension_display_hook,
    'plugin_system@add_page_hook': plugin_system2add_page_hook,

    'plugin_global@header_replace_hook': plugin_global2header_replace_hook,
    'plugin_global@footer_replace_hook': plugin_global2footer_replace_hook,
    'plugin_index@header_insert_before_hook': plugin_index2header_insert_before_hook,
    'plugin_index@header_insert_after_hook': plugin_index2header_insert_after_hook,
    'plugin_index@header_replace_hook': plugin_index2header_replace_hook,
    'plugin_index@tabs_replace_hook': plugin_index2tabs_replace_hook,
    'plugin_index@topping_insert_before_hook': plugin_index2topping_insert_before_hook,
    'plugin_index@topping_insert_after_hook': plugin_index2topping_insert_after_hook,
    'plugin_index@topping_replace_hook': plugin_index2topping_replace_hook,
    'plugin_index@left_replace_hook': plugin_index2left_replace_hook,
    'plugin_index@right_replace_hook': plugin_index2right_replace_hook,
    'plugin_index@recommend_replace_hook': plugin_index2recommend_replace_hook,
    'plugin_index@qrcode_replace_hook': plugin_index2qrcode_replace_hook,
    'plugin_index@copyright_replace_hook': plugin_index2copyright_replace_hook,
    'plugin_user@user_extension_action_hook': plugin_user2user_extension_action_hook,
    'plugin_user@user_extension_left_layout_hook': plugin_user2user_extension_left_layout_hook
}

export default function getInjection (name) {
    if ( INJECTION_LIST[name] ) {
        return INJECTION_LIST[name];
    } else {
        return null;
    }
}