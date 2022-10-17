import { useEffect, useState } from 'react'
import * as C from './App.styles'
import LogoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'
import { GridItemType } from './types/GridItemType'
import { items } from './data/items'
import { GridItem } from './components/GridItem'
import { time } from 'console'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'
import { isRegularExpressionLiteral } from 'typescript'

const App = () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [shownCount, setShownCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect( () =>  resetAndCreateGrid(), []);

    useEffect( () =>  {
        const timer = setInterval( () => {
            if(playing) {
                setTimeElapsed(timeElapsed + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [playing, timeElapsed]);

    useEffect( () => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

    // verifica se os 2 abertos são iguais
    useEffect( () => {
        if(shownCount === 2) {
            let opened = gridItems.filter(item => item.shown === true);
            if (opened.length === 2){
                // V1 - se são iguais, faça todos com "shown" permanent
            
                if(opened[0].item === opened[1].item) {
                    let tmpGrid = [...gridItems];
                    for(let i in tmpGrid) {
                        if(tmpGrid[i].shown) {
                            tmpGrid[i].permanentShown = true;
                            tmpGrid[i].shown = false;
                        }
                    }
                    setGridItems(tmpGrid);
                    setShownCount(0);
                }else{
                    //V2 - se não for isRegularExpressionLiteral, fecha os dois
                    setTimeout( () => {
                        let tmpGrid = [...gridItems];
                        for(let i in tmpGrid) {
                            tmpGrid[i].shown = false;
                        }
                        setGridItems(tmpGrid);
                        setShownCount(0);
                    }, 2000);
                }

                setMoveCount(moveCount => moveCount + 1 )
            }
        }
    }, [shownCount, gridItems]);

    const resetAndCreateGrid = () => {
        // step 1: Resetar o jogo
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);
        
        // Passo 2: criar e começar o jogo
        // Passo 2.1: criar um grid vazio
        let tmpGrid: GridItemType[] = [];

        for(let i=0; i < (items.length * 2); i++) {
            tmpGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            })
        }
        // passo 2.2: preencher o grid
        for(let w = 0; w < 2; w++) {

            for(let i=0; i < items.length; i++) {

                let pos = -1;
                while(pos < 0 || tmpGrid[pos].item !== null) {
                    pos = Math.floor(Math.random() * (items.length * 2));
                }

                tmpGrid[pos].item = i;
            }
        }
        
        // passo 2.3: jogar no state
        setGridItems(tmpGrid)
        

        // Passo 3: começar o jogo
        setPlaying(true);
    }

    const handleItemClick = (index: number) => {
        if(playing && index !== null && shownCount < 2){
            let tmpGrid = [...gridItems];

            if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
                tmpGrid[index].shown = true;
                setShownCount(shownCount + 1);
            }

            setGridItems(tmpGrid);
        }
    }

    return (
        <C.Container>
            <C.Info>

                <C.LogoLink href="#">
                    <img src={LogoImage} alt="Logo" width="200" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                    <InfoItem label="Movimento" value={moveCount.toString()} />
                </C.InfoArea>

                <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}></Button>
            </C.Info>
            <C.GridArea>
                <C.Grid>
                    {gridItems.map( (item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={()=>handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>
        </C.Container>
    )
}

export default App;