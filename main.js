equation = document.querySelector(".odometer");
    odometer = new Odometer({
        el: this.equation,
        value: 0
});
choice = document.getElementById()

class Application {
    data;
    parsedConfirmed = [];
    parsedDiscovered = [];
    parsedData = {
        labels: [],
        datasets: []
    };
    buttons = {
        wariancja: document.getElementById("wariancja"),
        rozstep: document.getElementById("rozstep"),
        mediana: document.getElementById("mediana"),
        kurtoza: document.getElementById("kurtoza"),
        odchylenie: document.getElementById("odchylenie"),
        pearson: document.getElementById("pearson"),
        spearman: document.getElementById("spearman"),
        skosnosc: document.getElementById("skosnosc"),
        kowariancja: document.getElementById("kowariancja")
    }

    constructor() {
        this.loadData();
    }
    loadData() {
        fetch("./src/data.json").then(res => res.json()).then(resdata => {
            this.data = resdata;
            this.parseData(this.data);
            this.loadChart();
            this.wariancjaF();
            this.rozstepF();
            this.kowariancjaF();
            this.kurtozaF();
            this.pearsonF();
            this.spearmanF();
            this.skosnoscF();
            this.odchylenieF();
            this.medianaF();
        });
    }
    loadChart() {
        var ctx = document.getElementById('mainChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: this.parsedData,
            options: {
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 15
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 12,
                            stepSize: 100,
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 12,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    parseData(data) {
        data.forEach(el => {
            this.parsedData.labels.unshift(el.Rok);
            this.parsedConfirmed.unshift(parseFloat(el.Przestepstwastwierdzone));
            this.parsedDiscovered.unshift(parseFloat(el.Przestepstwawykryte));
        });
        this.parsedData.datasets.push({
            label: "Wykryte zabojstwa",
            data: this.parsedDiscovered,
            borderWidth: 1,
            backgroundColor: "#ca3e47"
        });
        this.parsedData.datasets.push({
            label: "Stwierdzone zabojstwa",
            data: this.parsedConfirmed,
            borderWidth: 1,
            backgroundColor: "#701a20"
        });
    }
    choice(){

    }
    wariancjaF() {
        this.buttons.wariancja.onclick = function () {
            
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.variance(application.parsedConfirmed)));
            });
        }
    }
    rozstepF() {
        this.buttons.rozstep.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.range(application.parsedConfirmed)));
            });
        }
    }
    medianaF() {
        this.buttons.mediana.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.meddev(application.parsedConfirmed)));
            });
        }
    }
    kurtozaF() {
        this.buttons.kurtoza.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.kurtosis(application.parsedConfirmed)));
            });
        }
    }
    odchylenieF() {
        this.buttons.odchylenie.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.deviation(application.parsedConfirmed)));
            });
        }
    }
    pearsonF() {
        this.buttons.pearson.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.corrcoeff(application.parsedConfirmed, application.parsedDiscovered)));
                
                console.log(parseFloat(jStat.corrcoeff(application.parsedConfirmed, application.parsedDiscovered)));
            });
        }
    }
    spearmanF() {
        this.buttons.spearman.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.spearmancoeff(application.parsedConfirmed, application.parsedDiscovered)));
            });
        }
    }
    skosnoscF() {
        this.buttons.skosnosc.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.skewness(application.parsedConfirmed)));
            });
        }
    }
    kowariancjaF() {
        this.buttons.kowariancja.onclick = function () {
            setTimeout(function(){
                this.odometer.update(parseFloat(jStat.covariance(application.parsedConfirmed, application.parsedDiscovered)));
            });
        }
    }
}

const application = new Application();