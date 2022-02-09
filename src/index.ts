import app from './app';

async function main() {
    try {
        app.listen();
    } catch (error) {
        console.log(error);
    }
}

main();