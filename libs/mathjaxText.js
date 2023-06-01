const mathJaxText = (input) => {
    const regex = /\/mathjax_begin\/(.*?)\/mathjax_end\//g;
    let match;
    const array = [];
    let index = 0;

    while ((match = regex.exec(input)) !== null) {
        // Tách các phần tử text trước và sau phần tử mathjax
        const beforeText = input.substring(index, match.index);
        if (beforeText) {
            array.push({
                index: array.length,
                type: 'text',
                text: beforeText,
            });
        }

        const mathjaxText = match[1];
        array.push({
            index: array.length,
            type: 'mathjax',
            text: mathjaxText,
        });

        // Cập nhật chỉ mục tiếp theo
        index = match.index + match[0].length;
    }

    // Kiểm tra nếu còn phần tử text sau phần tử mathjax
    if (index < input.length - 1) {
        const remainingText = input.substring(index);
        array.push({
            index: array.length,
            type: 'text',
            text: remainingText,
        });
    }

    return array;
};

export default mathJaxText;
