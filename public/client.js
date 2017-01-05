(function() {

    // область для вставки контента
    const logsArea = document.getElementById('logs-area');
    const source = new EventSource('/watch');

    source.addEventListener('change', handleEvent, false);
    source.addEventListener('rename', handleEvent, false);


    function handleEvent(e) {
        let data = e.data.split('\n');
        let timestamp = data[0].split(' ')[1];
        let filename = data[1].split(' ')[1];

        logsArea.innerHTML += `<tr>
                                <td>${e.type}</td>
                                <td>${timestamp}</td>
                                <td>${filename}</td>
                               </tr>`;
    }


    // source.addEventListener('open', (e) => {
    //     // вывести что подключение установлено
    // }, false);
    //
    //
    //
    // source.addEventListener('error', (e) => {
    //     if (e.readyState === EventSource.CLOSED) {
    //         // подключение закрыто
    //     }
    // });


})();
