<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_56dedc26e5327',
    'title' => __('Social feed', 'modularity'),
    'fields' => array(
        0 => array(
            'key' => 'field_56dedc3548ed9',
            'label' => __('Feed type', 'modularity'),
            'name' => 'mod_social_type',
            'type' => 'radio',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'facebook' => __('Facebook', 'modularity'),
                'instagram' => __('Instagram', 'modularity'),
                'twitter' => __('Twitter', 'modularity'),
                'pinterest' => __('Pinterest', 'modularity'),
                'googleplus' => __('Google Plus', 'modularity'),
            ),
            'allow_null' => 0,
            'other_choice' => 0,
            'save_other_choice' => 0,
            'default_value' => '',
            'layout' => 'horizontal',
            'return_format' => 'value',
        ),
        1 => array(
            'key' => 'field_56dedd7948eda',
            'label' => __('Facebook App ID', 'modularity'),
            'name' => 'mod_social_api_user',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'facebook',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        2 => array(
            'key' => 'field_56dedda248edb',
            'label' => __('Facebook App Secret', 'modularity'),
            'name' => 'mod_social_api_secret',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'facebook',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        3 => array(
            'key' => 'field_56deddb348edc',
            'label' => __('Facebook username', 'modularity'),
            'name' => 'mod_social_query',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'facebook',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        4 => array(
            'key' => 'field_56deddcd48edd',
            'label' => __('Data type', 'modularity'),
            'name' => 'mod_social_data_type',
            'type' => 'radio',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'twitter',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'choices' => array(
                'hashtag' => __('Hashtag', 'modularity'),
                'user' => __('User', 'modularity'),
            ),
            'allow_null' => 0,
            'other_choice' => 0,
            'save_other_choice' => 0,
            'default_value' => 'hashtag',
            'layout' => 'horizontal',
            'return_format' => 'value',
        ),
        5 => array(
            'key' => 'field_56dee0e1ed7ab',
            'label' => __('Twitter Consumer Key', 'modularity'),
            'name' => 'mod_social_api_user',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'twitter',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        6 => array(
            'key' => 'field_56dee104ed7ac',
            'label' => __('Twitter Consumer Secret', 'modularity'),
            'name' => 'mod_social_api_secret',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'twitter',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        7 => array(
            'key' => 'field_57629445bddd5',
            'label' => __('Google+ Api Key', 'modularity'),
            'name' => 'mod_social_api_user',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'googleplus',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'maxlength' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        8 => array(
            'key' => 'field_56dede6048ee0',
            'label' => __('Username', 'modularity'),
            'name' => 'mod_social_query',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'instagram',
                    ),
                ),
                1 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'twitter',
                    ),
                    1 => array(
                        'field' => 'field_56deddcd48edd',
                        'operator' => '==',
                        'value' => 'user',
                    ),
                ),
                2 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'pinterest',
                    ),
                ),
                3 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'googleplus',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => __('@', 'modularity'),
            'append' => '',
            'maxlength' => '',
        ),
        9 => array(
            'key' => 'field_56dedeaa48ee2',
            'label' => __('Hashtag', 'modularity'),
            'name' => 'mod_social_query',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'twitter',
                    ),
                    1 => array(
                        'field' => 'field_56deddcd48edd',
                        'operator' => '==',
                        'value' => 'hashtag',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => __('#', 'modularity'),
            'append' => '',
            'maxlength' => '',
        ),
        10 => array(
            'key' => 'field_56dfe51e498cb',
            'label' => __('Max items', 'modularity'),
            'name' => 'mod_social_length',
            'type' => 'number',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => 10,
            'min' => '',
            'max' => '',
            'step' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        11 => array(
            'key' => 'field_56e01f2577390',
            'label' => __('Max height', 'modularity'),
            'name' => 'mod_social_max_height',
            'type' => 'number',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => 50,
                'class' => '',
                'id' => '',
            ),
            'default_value' => 300,
            'min' => '',
            'max' => '',
            'step' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => __('pixels', 'modularity'),
            'readonly' => 0,
            'disabled' => 0,
        ),
        12 => array(
            'key' => 'field_56e038fa40a78',
            'label' => __('Images per row', 'modularity'),
            'name' => 'mod_social_row_length',
            'type' => 'number',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'instagram',
                    ),
                ),
                1 => array(
                    0 => array(
                        'field' => 'field_56dedc3548ed9',
                        'operator' => '==',
                        'value' => 'pinterest',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => 3,
            'min' => '',
            'max' => '',
            'step' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'readonly' => 0,
            'disabled' => 0,
        ),
        13 => array(
            'key' => 'field_59afbaef4019a',
            'label' => __('Link to page', 'modularity'),
            'name' => 'mod_social_link',
            'type' => 'true_false',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'message' => __('Check this box if you want to display a button that links to the social media page.', 'modularity'),
            'default_value' => 0,
            'ui' => 0,
            'ui_on_text' => '',
            'ui_off_text' => '',
        ),
        14 => array(
            'key' => 'field_59afbc492866a',
            'label' => __('URL', 'modularity'),
            'name' => 'mod_social_link_url',
            'type' => 'url',
            'instructions' => __('Enter URL to the social media feed or page.', 'modularity'),
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_59afbaef4019a',
                        'operator' => '==',
                        'value' => '1',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
        15 => array(
            'key' => 'field_59afbbaa061a7',
            'label' => __('Button text', 'modularity'),
            'name' => 'mod_social_link_text',
            'type' => 'text',
            'instructions' => __('Enter button text.', 'modularity'),
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_59afbaef4019a',
                        'operator' => '==',
                        'value' => '1',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '50',
                'class' => '',
                'id' => '',
            ),
            'default_value' => 'Gå till sida',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'mod-social',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
));
}