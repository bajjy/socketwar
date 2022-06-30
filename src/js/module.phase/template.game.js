
const TEMPLATE_GAME = /*html*/`
    <div class="template-game">
        <div class="gameCanvas">
            <div class="battlefield">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
                <div class="circle circle-5"></div>
                <div class="circle circle-6"></div>
                <div class="circle circle-7"></div>
                <div class="circle circle-8"></div>
                <div class="circle circle-9"></div>
                <div class="circle circle-10"></div>
                <div class="circle circle-11"></div>
                <div class="circle circle-12"></div>
                <div class="circle circle-13"></div>
                <div class="circle circle-14"></div>
            </div>
            <div class="magiccircle hidden">
                <div class="circle circle-1">
                    <div data-arcane="0">a</div>
                </div>
                <div class="circle circle-2">
                    <div data-arcane="1">z</div>
                </div>
                <div class="circle circle-3">
                    <div data-arcane="2">o</div>
                </div>
                <div class="circle circle-4">
                    <div data-arcane="3">t</div>
                </div>
                <div class="circle circle-5">
                    <div data-arcane="4">d</div>
                </div>
                <div class="circle circle-6">
                    <div data-arcane="5">i</div>
                </div>
                <div class="circle circle-7">
                    <div data-arcane="6">b</div>
                </div>
                <div class="circle circle-8">
                    <div data-arcane="7">p</div>
                </div>
            </div>
            <div class="startspell">
            </div>
        </div>
        <div class="gameInfo hidden">
            READY
        </div>
    </div>
`;

export default TEMPLATE_GAME;