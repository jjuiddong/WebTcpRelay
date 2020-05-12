package wmon.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MonController {

	
	@RequestMapping("mon")
	String mon() {
		
		return "mon";
	}	

	
}
