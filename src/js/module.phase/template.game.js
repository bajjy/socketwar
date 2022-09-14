
const TEMPLATE_GAME = /*html*/`
    <div class="template-game">
        <div class="gameCanvas">
            <div class="floor"></div>
            <div class="battlefield">
                <div class="circle circle-1" data-target="0"></div>
                <div class="circle circle-2" data-target="1"></div>
                <div class="circle circle-3" data-target="2"></div>
                <div class="circle circle-4" data-target="3"></div>
                <div class="circle circle-5" data-target="4"></div>
                <div class="circle circle-6" data-target="5"></div>
                <div class="circle circle-7" data-target="6"></div>
                <div class="circle circle-8" data-target="7"></div>
                <div class="circle circle-9" data-target="8"></div>
                <div class="circle circle-10" data-target="9"></div>
                <div class="circle circle-11" data-target="10"></div>
                <div class="circle circle-12" data-target="11"></div>
                <div class="circle circle-13" data-target="12"></div>
                <div class="circle circle-14" data-target="13"></div>
            </div>
            <div class="magiccircle hidden" data-magiccircle="1">
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
            <div class="startspell" data-startspell="1">
            </div>
        </div>
        <div class="gameInfo hidden">
            READY
        </div>
        <!-- a-scene>
            <a-assets>
                <a-asset-item id="character_rogue" src="/models/ch/character_rogue.gltf"></a-asset-item>
            </a-assets>
            <!-position="x y z" - z far from obj ->
            <a-entity 
                id="base_camera" 
                camera
                position="0 15 10" 
                rotation="-50 0 0"
            ></a-entity>
            <a-entity gltf-model="#character_rogue" modify-materials scale="1 1 1"></a-entity>
        </a-scene-->
    </div>
`;

export default TEMPLATE_GAME;