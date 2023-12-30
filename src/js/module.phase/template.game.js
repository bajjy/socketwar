
const TEMPLATE_GAME = /*html*/`
    <div class="template-game">
        <div class="gameCanvas">
            <div class="floor"></div>
            <div class="arcane-info" data-arcaneinfo="arcaneInfo" style="top: 116.156px; left: 98.75px; width: 167.5px;">
                <div class="arcane-item">
                <span class="sign">Ξ</span>
                <span class="title">Xi</span>
                </div>
                <div class="arcane-item">
                <span class="sign">Σ</span>
                <span class="title">Sigma</span>
                </div>
                <div class="arcane-item">
                <span class="sign">Ψ</span>
                <span class="title">Psi</span>
                </div>
                <div class="arcane-item">
                <span class="sign">Ω</span>
                <span class="title">Omega</span>
                </div>
            </div>
            <div class="battlefield">
                <div class="circle circle-1"></div>
            </div>
            <div class="magiccircle hidden" data-magiccircle="1">
                <div class="circle circle-1">
                    <div data-arcane="0">Α</div>
                    <!-- div data-arcane="0">&Alpha;</div-->
                </div>
                <div class="circle circle-2">
                    <div data-arcane="1">Δ</div>
                    <!-- div data-arcane="0">&Delta;</div-->
                </div>
                <div class="circle circle-3">
                    <div data-arcane="2">Θ</div>
                    <!-- div data-arcane="0">&Theta;</div-->
                </div>
                <div class="circle circle-4">
                    <div data-arcane="3">Λ</div>
                    <!-- div data-arcane="0">&Lambda;</div-->
                </div>
                <div class="circle circle-5">
                    <div data-arcane="4">Ξ</div>
                    <!-- div data-arcane="0">&Xi;</div-->
                </div>
                <div class="circle circle-6">
                    <div data-arcane="5">Σ</div>
                    <!-- div data-arcane="0">&Sigma;</div-->
                </div>
                <div class="circle circle-7">
                    <div data-arcane="6">Ψ</div>
                    <!-- div data-arcane="0">&Psi;</div-->
                </div>
                <div class="circle circle-8">
                    <div data-arcane="7">Ω</div>
                    <!-- div data-arcane="0">&Omega;</div-->
                </div>
            </div>
            <div class="startspell" data-startspell="1">
            </div>
            <div class="messagesinfo" data-messagesinfo="messagesInfo">
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