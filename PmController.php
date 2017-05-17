<?php 
//require_once("dompdf/dompdf_config.inc.php");
/**

 */
class PmController extends Zend_Controller_Action
{
	
    public function init(){
    /**
	 *
	 *
	 */    
    	
    	$this->_helper->_layout->setLayout('parcel100-layout-main');
	
	}
	public function emptyAction(){
		
	}

    public function indexAction(){

    	if($_POST){
    		$mcp = new Model_Pricematcher_Mcprice();
    		$cmp = new Model_Pricematcher_Cmprice();
    		$twp = new Model_Pricematcher_Twprice();
    		$plp = new Model_Pricematcher_Plprice();
    		
    		$keyword = trim($_POST['keyword']);
    		$arrCm = $cmp->searchkeyword($keyword);
    		$arrMc = $mcp->searchkeyword($keyword);
    		$arrTw = $twp->searchkeyword($keyword);
    		$arrPl = $plp->searchkeyword($keyword);
    		
    		$arrSort = array();
    		$arrTitle = array();
    		foreach($arrCm as $key => $v){
    			$arrSort[] = $v;
    			$arrTitle[] = $v[0];
    		}
    		
    		foreach($arrMc as $key => $v){
    			$arrSort[] = $v;
    			$arrTitle[] = $v[0];
    		}
    		foreach($arrTw as $key => $v){
    			$arrSort[] = $v;
    			$arrTitle[] = str_replace("-", " ",$v[0]);
    		}
    		foreach($arrPl as $key => $v){
    			$arrSort[] = $v;
    			$arrTitle[] = $v[0];
    		}
    		
    		array_multisort($arrTitle,$arrSort);
    		
    		//var_dump($arrTitle,$arrSort);
    		$this->view->arrSort = $arrSort;
    		
    	}
 
    }
    public function sentAction(){
    	
    	$this->_helper->_layout->disableLayout();
    	if($_POST){
    		//echo "P100GOOD";
    		$str = $_POST['msg'];
    		//echo $str;
    		$html = base64_decode($str);
    		//$mc = new Model_Pricematcher_Mcprice();
    		$cw = new Model_Pricematcher_Cmprice();
    		$phtml = $cw->clearResult($html);
    		$arrRes = $cw->analysisProductHtml($phtml);
    		//$mc->analysisProductHtml($phtml)
    		//var_dump($arrRes);
    		$arrJson = array();
    		foreach($arrRes as $key => $v){
    			$object = new stdClass();
    			$object->name = $v[0];
    			$object->thumb = $v[1];
    			$object->price = $v[2];
    			$object->where = $v[3];
    			$arrJson[] = $object;
    		}
    		echo json_encode($arrJson);
    		//$fl = fopen(getcwd()."/abcde", "a");
    		//fwrite($fl, $html);
    		//fclose($fl);
    	}
    	$this->render('empty');
    }
    public function sentMcAction(){
    	
    	$this->_helper->_layout->disableLayout();
    	if($_POST){
    		//echo "P100GOOD";
    		$str = $_POST['msg'];
    		//echo $str;
    		$html = base64_decode($str);
    		$mc = new Model_Pricematcher_Mcprice();
    		//$cw = new Model_Pricematcher_Cmprice();
    		$phtml = $mc->clearResult($html);
    		$arrRes = $mc->analysisProductHtml($phtml);
    		//$mc->analysisProductHtml($phtml)
    		//var_dump($arrRes);
    		$arrJson = array();
    		foreach($arrRes as $key => $v){
    			$object = new stdClass();
    			$object->name = $v[0];
    			$object->thumb = $v[1];
    			$object->price = $v[2];
    			$object->where = $v[3];
    			$arrJson[] = $object;
    		}
    		echo json_encode($arrJson);
    		//$fl = fopen(getcwd()."/abcde", "a");
    		//fwrite($fl, $html);
    		//fclose($fl);
    	}
    	$this->render('empty');
    }
    public function sentTwAction(){
    	
    	$this->_helper->_layout->disableLayout();
    	if($_POST){
    		//echo "P100GOOD";
    		$str = $_POST['msg'];
    		//echo $str;
    		$html = base64_decode($str);
    		$fl = fopen(getcwd()."/twresult", "a");
    		fwrite($fl, $html);
    		fclose($fl);
    		
    		//$mc = new Model_Pricematcher_Mcprice();
    		//$cw = new Model_Pricematcher_Cmprice();
    		$tw = new Model_Pricematcher_Twprice();
    		$phtml = $tw->clearResultMobile($html);
    		$arrRes = $tw->analysisProductHtmlMobile($phtml);
    		//$mc->analysisProductHtml($phtml)
    		//var_dump($arrRes);
    		$arrJson = array();
    		foreach($arrRes as $key => $v){
    			$object = new stdClass();
    			$object->name = $v[0];
    			$object->thumb = $v[1];
    			$object->price = $v[2];
    			$object->where = $v[3];
    			$arrJson[] = $object;
    		}
    		echo json_encode($arrJson);
    		//$fl = fopen(getcwd()."/abcde", "a");
    		//fwrite($fl, $html);
    		//fclose($fl);
    	}
    	$this->render('empty');
    }
   
			
}
?>