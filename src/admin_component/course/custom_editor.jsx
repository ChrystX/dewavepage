// customEditor.js
import { ClassicEditor } from 'ckeditor5';
import {
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    BlockQuote,
    Heading,
    List,
    Link,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageUpload,
    Table,
    TableToolbar,
    CodeBlock,
    Highlight,
    Font,
    Alignment,
    AutoImage
} from 'ckeditor5';

class CustomEditor extends ClassicEditor {}

CustomEditor.builtinPlugins = [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading,
    BlockQuote,
    List,
    Link,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageUpload,
    AutoImage,
    Table,
    TableToolbar,
    CodeBlock,
    Highlight,
    Font,
    Alignment
];

CustomEditor.defaultConfig = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'highlight',
        '|',
        'link',
        'blockquote',
        'insertTable',
        'imageUpload',
        'codeBlock',
        '|',
        'bulletedList',
        'numberedList',
        'alignment',
        '|',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'undo',
        'redo',
    ],
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative',
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
};

export default CustomEditor;
